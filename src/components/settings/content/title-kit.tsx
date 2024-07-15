import TooltipSimple from "@/components/ui/TooltipSimple";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
const TitleKit = ({
  title,
  info,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { title: string; info?: string }) => {
  return (
    <div className={cn("flex gap-2 items-center", className)} {...rest}>
      <p className="">{title}</p>
      {info && (
        <TooltipSimple content={info}>
          <p className="text-tsecondary">...</p>
        </TooltipSimple>
      )}
    </div>
  );
};

export default TitleKit;
