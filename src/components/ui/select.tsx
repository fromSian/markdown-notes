import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, ReactNode, SetStateAction, useTransition } from "react";

interface SelectProps {
  content: ReactNode;
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Select = ({ content, children, open, setOpen }: SelectProps) => {
  const [isPending, startTransition] = useTransition();
  const onOpenChange = (e: boolean) => {
    startTransition(() => {
      setOpen(e);
    });
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="">{content}</div>
      </PopoverTrigger>
      <PopoverContent asChild>{children}</PopoverContent>
    </Popover>
  );
};

export default Select;
