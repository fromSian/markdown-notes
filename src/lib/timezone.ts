import { formatInTimeZone } from "date-fns-tz";

export const getDateTimeInCurrentTimeZone = (_date: string) => {
  const date = new Date(_date);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date_str = formatInTimeZone(date, timezone, "yyyy-MM-dd HH:mm:ss");
  return date_str;
};
