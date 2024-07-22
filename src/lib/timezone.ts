import { formatDistanceToNowStrict } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { enUS } from "date-fns/locale/en-US";
import { zhCN } from "date-fns/locale/zh-CN";
import { zhTW } from "date-fns/locale/zh-TW";

export const getDateTimeInCurrentTimeZone = (_date: string) => {
  const date = new Date(_date);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date_str = formatInTimeZone(date, timezone, "yyyy-MM-dd HH:mm:ss");
  return date_str;
};

export const getLocaleObj = (locale: string) => {
  let localeObject;
  switch (locale) {
    case "zh-CN":
      localeObject = zhCN;
      break;
    case "zh-TW":
      localeObject = zhTW;
      break;
    default:
      localeObject = enUS;
  }
  return localeObject;
};

export const formatDistanceFromNow = (_date: string, locale: string) => {
  const date = new Date(_date);
  const localeObject = getLocaleObj(locale);
  let str = formatDistanceToNowStrict(date, {
    locale: localeObject,
  });
  return str;
};
