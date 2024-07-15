import SignUp from "@/components/welcome/sign/signup";
import { useState } from "react";
import TitleKit from "../title-kit";

const AccountTypeConvert = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 ">
      <TitleKit
        className="py-2 px-4 rounded-md bg-slate-600 cursor-pointer"
        title={"convert user type"}
        onClick={() => setOpen((v) => !v)}
      />
      <SignUp open={open} />
    </div>
  );
};

export default AccountTypeConvert;
