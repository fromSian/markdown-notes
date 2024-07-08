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
import CalendarRange from "./CalendarRange";

interface DateRangeProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

const DateRange = ({ date, setDate }: DateRangeProps) => {
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
    <div className={cn("grid gap-2")}>
      <Popover open={open} onOpenChange={handleChange}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "p-1 rounded-sm  cursor-pointer",
              date && "bg-secondary text-red-500"
            )}
          >
            <CalendarIcon size={20} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarRange onCancel={onCancel} onSubmit={onSubmit} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRange;
