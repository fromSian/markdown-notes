import { Eye, EyeOff } from "lucide-react";

import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useState,
  useTransition,
} from "react";
import { Input } from "./input";
import InputWithLabel from "./input-with-label";
const InputShowHide = forwardRef(
  (
    props: ComponentProps<typeof Input>,
    ref: ForwardedRef<HTMLInputElement> | undefined
  ) => {
    const [show, setShow] = useState(false);
    const [isPending, startTransition] = useTransition();

    const toggleShow = () => {
      startTransition(() => {
        setShow(!show);
      });
    };
    return (
      <InputWithLabel
        {...props}
        type={show ? "text" : "password"}
        ref={ref}
        extraNode={
          <span
            className="absolute right-1 w-8 cursor-pointer text-ttertiary"
            onClick={toggleShow}
            style={{
              bottom: "10px",
            }}
          >
            {show ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        }
      />
    );
  }
);

export default InputShowHide;
