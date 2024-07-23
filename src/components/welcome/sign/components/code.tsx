import Fail from "@/components/icons/fail";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { Step } from "@/types/account";
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
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface CodeProps {
  email: string;
  setStep: Dispatch<SetStateAction<Step>>;
  sendVerificationCode: (email: string) => void;
  buttonStr: string;
  initialSended?: boolean;
}

const Code = ({
  email,
  setStep,
  sendVerificationCode,
  buttonStr,
  initialSended = true,
}: CodeProps) => {
  const { t } = useTranslation("message");
  const [time, setTime] = useState(0);
  const timeRef = useRef<ReturnType<typeof setInterval>>();
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const mount = () => {
    setTime(60);
    countDown();
    inputRef.current?.focus();
    setValue("");
  };

  const handleResend = useCallback(async () => {
    try {
      if (!email) {
        return;
      }
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
    if (initialSended) {
      mount();
    }

    return () => {
      clearCountDown();
    };
  }, [initialSended]);

  const verifyCode = async (email: string, code: string) => {
    try {
      if (!email || !code) return;
      setLoading(true);
      setFail(false);
      const url = "/account/verify-code/";
      await request.post(url, {
        email,
        code,
      });

      toast.success(t("verify-code-success", { ns: "message" }));
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
        <div className="flex gap-2 justify-center items-center my-2">
          <div className={cn("text-sm", Boolean(time) && "text-ttertiary")}>
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <button
                className={cn(
                  "btn",
                  Boolean(time) && "opacity-30 pointer-events-none"
                )}
                disabled={Boolean(time)}
                onClick={handleResend}
              >
                {time ? `(${time}) ` : ""}
                {buttonStr}
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
