import { cn } from "@/lib/utils";
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
      <div
        className={cn(
          "grid transition-all",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">123</div>
      </div>
    </div>
  );
};

export default AccountTypeConvert;
