import { addDays, format } from "date-fns";
import { useCallback, useState, useTransition } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

interface CalendarRangeProps {
  onCancel: () => void;
  onSubmit: (date: DateRange | undefined) => void;
}

const CalendarRange = ({ onCancel, onSubmit }: CalendarRangeProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [isPending, startTransition] = useTransition();

  const handleClear = () => {
    startTransition(() => {
      setDate(undefined);
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleOk = useCallback(() => {
    if (onSubmit) {
      onSubmit(date);
    }
  }, [date]);

  return (
    <div>
      <p className="text-center mt-4">
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span>Pick a date</span>
        )}
      </p>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
      />

      <div className="flex justify-end gap-4 mb-4 px-3">
        <button onClick={handleClear} className="black_btn">
          clear
        </button>
        <button onClick={handleCancel} className="black_btn">
          cancel
        </button>
        <button onClick={handleOk} className="black_btn">
          ok
        </button>
      </div>
    </div>
  );
};

export default CalendarRange;
