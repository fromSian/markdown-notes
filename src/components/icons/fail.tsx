import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const Fail = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-full w-6 h-6 flex justify-center items-center bg-red-500 bg-opacity-50 not-italic font-bold cursor-pointer",
        className
      )}
      {...rest}
    >
      !
    </div>
  );
};

export default Fail;
