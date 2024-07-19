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
  side?: "top" | "right" | "bottom" | "left";
}
const Select = ({ content, children, open, setOpen, side }: SelectProps) => {
  const [isPending, startTransition] = useTransition();
  const onOpenChange = (e: boolean) => {
    startTransition(() => {
      setOpen(e);
    });
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{content}</PopoverTrigger>
      <PopoverContent asChild side={side}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default Select;
