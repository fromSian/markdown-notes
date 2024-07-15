import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { forwardRef, LegacyRef, ReactNode } from "react";
interface TooltipSimpleProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

const TooltipSimple = forwardRef(
  (
    { children, content, side }: TooltipSimpleProps,
    ref: LegacyRef<HTMLButtonElement>
  ) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger ref={ref}>{children}</TooltipTrigger>
          <TooltipContent side={side} className="max-w-72">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

export default TooltipSimple;
