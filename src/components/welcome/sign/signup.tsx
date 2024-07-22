import { handleRSAEncrypt } from "@/lib/encryption";
import { cn } from "@/lib/utils";
import { fetchLogin } from "@/request/account";
import request from "@/request/request";
import { useAppDispatch } from "@/states/hooks";
import { Step } from "@/types/account";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Code from "./components/code";
import Email from "./components/email";
import Password from "./components/password";
import Success from "./components/success";

interface SignUpProps {
  open: boolean;
  goSomeWhereElse: () => void;
}

const SignUp = ({ open, goSomeWhereElse }: SignUpProps) => {
  const { t } = useTranslation(["translation", "message"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      return;
    }
    const {
      defaultExpanded,
      showExactTime,
      sortInfo,
      language,
      theme,
      ...rest
    } = await fetchLogin({
      email,
      password: handleRSAEncrypt(password) || "",
    });
    dispatch({
      type: "account/setAccount",
      payload: rest,
    });
    const systemConfig = {
      language: language,
      theme: theme,
    };
    dispatch({
      type: "account/setConfig",
      payload: systemConfig,
    });
    const noteConfig = {
      showExactTime: showExactTime,
      defaultExpanded: defaultExpanded,
      sortInfo: sortInfo,
    };
    dispatch({
      type: "note/setConfig",
      payload: noteConfig,
    });
    toast.success(t("signin-success", { ns: "message" }));
    navigate("/");
  }, [email, password]);

  const handleExit = () => {
    goSomeWhereElse();
    setStep("email");
  };

  const sendVerificationCode = async (_email: string) => {
    const url = "/account/send-code/";
    await request.post(url, { email: _email });
  };

  const handlePasswordSubmit = useCallback(
    async (_password: string) => {
      const url = "/account/register/";
      const response = await request.post(url, {
        email,
        password: handleRSAEncrypt(_password),
      });
      setPassword(_password);
      setStep("success");
      toast.success(t("signup-success", { ns: "message" }));
    },
    [email]
  );

  return (
    <div
      className={cn(
        "grid transition-all duration-500 w-full",
        open
          ? "grid-rows-[1fr] opacity-100 mb-4"
          : "grid-rows-[0fr] opacity-0 mb-0"
      )}
    >
      <div className="overflow-hidden">
        {step !== "success" && (
          <Email
            step={step}
            setStep={setStep}
            setEmail={setEmail}
            sendVerificationCode={sendVerificationCode}
          />
        )}
        {step === "code" && (
          <Code
            setStep={setStep}
            email={email}
            sendVerificationCode={sendVerificationCode}
            buttonStr={t("re-verify-code", { ns: "translation" })}
          />
        )}
        {step === "password" && (
          <Password handlePasswordSubmit={handlePasswordSubmit} />
        )}
        {step === "success" && (
          <Success goSomeWhereElse={handleExit} handleLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default SignUp;
