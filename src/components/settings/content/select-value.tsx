import Select from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface SelectValueProps {
  value: string;
  setValue: ((v: string) => Promise<void>) | Dispatch<SetStateAction<string>>;
  items: Array<{ value: string; label: ReactNode }>;
  className?: string;
}

const SelectValue = ({
  value,
  setValue,
  items,
  className,
}: SelectValueProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Select
      open={open}
      setOpen={setOpen}
      content={
        <div
          className={cn(
            "cursor-pointer border px-1 sm:px-4 rounded-sm bg-primary-foreground truncate",
            className
          )}
          onClick={() => setOpen(true)}
        >
          {items.find((item) => item.value === value)?.label}
        </div>
      }
    >
      <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2 items-center">
        {items
          .filter((item) => item.value !== value)
          .map((item) => (
            <div
              className="cursor-pointer"
              key={item.value}
              onClick={() => {
                setValue(item.value);
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
      </div>
    </Select>
  );
};
export default SelectValue;
