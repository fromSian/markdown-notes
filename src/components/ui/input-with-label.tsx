import { cn } from "@/lib/utils";
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import { Input } from "./input";

const InputWithLabel = forwardRef(
  (
    {
      className,
      value,
      placeholder,
      onChange,
      extraNode,
      ...rest
    }: ComponentProps<typeof Input> & { extraNode?: ReactNode },
    ref: ForwardedRef<HTMLInputElement> | undefined
  ) => {
    const [topLeft, setTopLeft] = useState(Boolean(value));

    return (
      <div className="relative -mt-4 mb-4">
        <p
          className={cn(
            "relative px-2 left-2 w-max bg-background rounded-md overflow-visible text-ttertiary text-base opacity-0 transition-all float-left -z-10",
            topLeft && "opacity-100 z-10"
          )}
          style={{
            transform: topLeft
              ? "translateY(45%) scale(0.85)"
              : "translateY(120%) scale(1)",
          }}
        >
          {placeholder}
        </p>
        <Input
          autoComplete="on"
          className={cn(
            "outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 ring-0 text-base focus-visible:border-primary",
            className
          )}
          ref={ref}
          value={value}
          onChange={(e) => {
            setTopLeft(Boolean(e.target.value));
            if (onChange) onChange(e);
          }}
          placeholder={placeholder}
          {...rest}
        />

        {extraNode}
      </div>
    );
  }
);

export default InputWithLabel;
