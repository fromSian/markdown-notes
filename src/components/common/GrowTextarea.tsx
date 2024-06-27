import { cn } from "@/lib/utils";
import {
  DetailedHTMLProps,
  MutableRefObject,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
} from "react";
import "./index.css";
const GrowTextarea = forwardRef(
  (
    props: DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > & { wrapClassName?: string },
    ref
  ) => {
    const { className, wrapClassName, onChange, ...rest } = props;
    const parentRef = useRef<HTMLDivElement>(null);
    return (
      <div
        data-replicated-value={rest.value || ""}
        className={cn("grow-wrap", wrapClassName)}
        ref={parentRef}
      >
        <textarea
          className={cn(className, "bg-background")}
          onChange={(e) => {
            if (onChange) onChange(e);
            parentRef.current?.setAttribute(
              "data-replicated-value",
              e.target.value
            );
          }}
          ref={ref as MutableRefObject<HTMLTextAreaElement>}
          {...rest}
        ></textarea>
      </div>
    );
  }
);

export default GrowTextarea;
