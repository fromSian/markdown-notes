import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { HTMLAttributes } from "react";
const SuccessIcon = ({
  className,
  size = 16,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { size?: number }) => {
  return (
    <div
      className={cn(
        "rounded-full w-6 h-6 flex justify-center items-center bg-success text-success-foreground bg-opacity-50",
        className
      )}
      {...rest}
    >
      <Check size={size} className="" />
    </div>
  );
};

export default SuccessIcon;
