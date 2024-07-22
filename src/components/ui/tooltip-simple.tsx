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
  className?: string;
}

const TooltipSimple = forwardRef(
  (
    { children, content, side, className }: TooltipSimpleProps,
    ref: LegacyRef<HTMLButtonElement>
  ) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={className} ref={ref}>
            {children}
          </TooltipTrigger>
          <TooltipContent side={side} className="max-w-96">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

export default TooltipSimple;
