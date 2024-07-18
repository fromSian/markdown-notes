import Code from "@/components/welcome/sign/components/code";
import Password from "@/components/welcome/sign/components/password";
import { cn } from "@/lib/utils";
import { logout } from "@/states/account.slice";
import { useAppDispatch } from "@/states/hooks";
import { useState } from "react";
import { toast } from "sonner";
import TitleKit from "../title-kit";

const PasswordChange = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"code" | "password">("code");

  const handlePasswordSubmit = () => {
    toast.success("change password successfully");
    dispatch(logout());
  };
  return (
    <div className="flex flex-col mb-4">
      <TitleKit
        className="py-2 px-4 rounded-md bg-emphasis cursor-pointer"
        title={"changePassword"}
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
              buttonStr={"send code"}
              email={"f"}
              sendVerificationCode={() => {}}
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
