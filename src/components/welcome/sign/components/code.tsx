import Fail from "@/components/icons/fail";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Loader } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

interface CodeProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Code = ({ email, setStep, sendVerificationCode }: CodeProps) => {
  const [time, setTime] = useState(5);
  const timeRef = useRef<ReturnType<typeof setInterval>>();
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const mount = () => {
    countDown();
    inputRef.current?.focus();
    setValue("");
  };
  const handleResend = useCallback(async () => {
    try {
      setLoading(true);
      await sendVerificationCode(email);
      mount();
    } finally {
      setLoading(false);
    }
  }, [email]);

  const clearCountDown = () => {
    timeRef.current && clearInterval(timeRef.current);
    timeRef.current = undefined;
  };

  const countDown = () => {
    clearCountDown();
    timeRef.current = setInterval(() => {
      setTime((v) => {
        if (!v) {
          return v;
        }
        if (v < 2) {
          clearCountDown();
        }
        return v - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    mount();

    return () => {
      clearCountDown();
    };
  }, []);

  const verifyCode = async (email, code) => {
    try {
      setLoading(true);
      setFail(false);
      const url = "/account/verify-code/";
      await request.post(url, {
        email,
        code,
      });

      toast.success("verify verification code successfully");
      setStep("password");
    } catch (error) {
      setFail(true);
    } finally {
      setLoading(false);
    }
  };

  const onComplete = useCallback(
    async (value: string) => {
      verifyCode(email, value);
    },
    [email]
  );

  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onComplete={onComplete}
          ref={inputRef}
          value={value}
          onChange={(v) => setValue(v)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex gap-2 justify-center items-center mb-2">
          <div className={cn("text-sm", Boolean(time) && "text-ttertiary")}>
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <button disabled={Boolean(time)} onClick={handleResend}>
                {time ? time : ""}re send code
              </button>
            )}
          </div>
          {fail && <Fail className="w-5 h-5 text-sm" />}
        </div>
      </div>
    </>
  );
};

export default Code;
