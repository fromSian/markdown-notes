import TooltipSimple from "@/components/ui/tooltip-simple";
import { cn } from "@/lib/utils";
import { MessageCircleMore } from "lucide-react";
import { HTMLAttributes } from "react";
const TitleKit = ({
  title,
  info,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { title: string; info?: string }) => {
  return (
    <div
      className={cn("flex gap-2 items-center overflow-hidden", className)}
      {...rest}
    >
      <TooltipSimple content={title} className="truncate">
        <p>{title}</p>
      </TooltipSimple>
      {info && (
        <TooltipSimple content={info} className="flex-1">
          <MessageCircleMore size={16} className="text-tsecondary" />
        </TooltipSimple>
      )}
    </div>
  );
};

export default TitleKit;
