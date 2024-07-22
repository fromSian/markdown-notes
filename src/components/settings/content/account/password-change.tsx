import Code from "@/components/welcome/sign/components/code";
import Password from "@/components/welcome/sign/components/password";
import { handleRSAEncrypt } from "@/lib/encryption";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { logout } from "@/states/account.slice";
import { useAppDispatch } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { Step } from "@/types/account";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import TitleKit from "../title-kit";

interface PasswordChangeProps {
  email: string;
}

const PasswordChange = ({ email }: PasswordChangeProps) => {
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const { t } = useTranslation(["settings", "translation", "message"]);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("code");

  const sendVerificationCode = async () => {
    const url = "/account/send-code/";
    const data = {
      email: email,
      register: false,
    };
    const response = await request.post(url, data);
  };

  const handlePasswordSubmit = async (password: string) => {
    const url = "/account/password/";
    const response = await request.put(url, {
      password: handleRSAEncrypt(password),
    });
    toast.success(t("change-password-success", { ns: "message" }));
    setTimeout(() => {
      dispatch(logout());
    }, 3000);
  };
  return (
    <div className="flex flex-col mb-4">
      <TitleKit
        className="py-2 px-4 rounded-md bg-emphasis cursor-pointer"
        title={t("change-password")}
        onClick={() => setOpen((v) => !v)}
      />
      <div
        className={cn(
          "grid transition-all",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className={cn("overflow-hidden", open ? "pt-4" : "pt-0")}>
          {step === "code" && (
            <Code
              buttonStr={t("verify-code", { ns: "translation" })}
              email={email}
              sendVerificationCode={sendVerificationCode}
              setStep={setStep}
              initialSended={false}
            />
          )}
          {step === "password" && (
            <Password handlePasswordSubmit={handlePasswordSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
