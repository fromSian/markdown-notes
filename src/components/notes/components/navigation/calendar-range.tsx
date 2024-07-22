import { format } from "date-fns";
import { useCallback, useState, useTransition } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { getLocaleObj } from "@/lib/timezone";
import { useTranslation } from "react-i18next";

interface CalendarRangeProps {
  initialDate: DateRange | undefined;
  onCancel: () => void;
  onSubmit: (date: DateRange | undefined) => void;
}

const CalendarRange = ({
  initialDate,
  onCancel,
  onSubmit,
}: CalendarRangeProps) => {
  const { t } = useTranslation("note");
  const [date, setDate] = useState<DateRange | undefined>(initialDate);
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
              {format(date.from, "yyyy-MM-dd")} -{" "}
              {format(date.to, "yyyy-MM-dd")}
            </>
          ) : (
            format(date.from, "yyyy-MM-dd")
          )
        ) : (
          <span>{t("date-picker.current-empty")}</span>
        )}
      </p>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        locale={getLocaleObj(localStorage.getItem("i18nextLng") || "en")}
      />

      <div className="flex justify-between gap-4 mb-4 px-3">
        <button onClick={handleClear} className="btn">
          {t("date-picker.reset")}
        </button>
        <div className="flex gap-4">
          <button onClick={handleCancel} className="btn">
            {t("date-picker.cancel")}
          </button>
          <button onClick={handleOk} className="btn">
            {t("date-picker.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarRange;
