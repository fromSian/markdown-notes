"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import CalendarRange from "./calendar-range";

interface DateRangeProps {
  disabled: boolean;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

const DateRange = ({ disabled, date, setDate }: DateRangeProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: boolean) => {
    startTransition(() => {
      setOpen(e);
    });
  };

  const onCancel = () => {
    startTransition(() => {
      setOpen(false);
    });
  };

  const onSubmit = (date: DateRange | undefined) => {
    startTransition(() => {
      setDate(date);
      setOpen(false);
    });
  };

  return (
    <div className={cn("grid gap-2", disabled && "cursor-not-allowed")}>
      <Popover open={open} onOpenChange={handleChange}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "p-1 rounded-sm  cursor-pointer",
              date && "bg-secondary text-temphasis",
              disabled && "pointer-events-none"
            )}
          >
            <CalendarIcon size={20} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarRange
            onCancel={onCancel}
            onSubmit={onSubmit}
            initialDate={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRange;
