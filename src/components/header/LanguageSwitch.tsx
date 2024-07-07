import { useTranslation } from "react-i18next";

import { languages } from "@/i18";
import Cookies from "js-cookie";
import { useEffect, useState, useTransition } from "react";
import Select from "../ui/select";

type LanguageType = "en" | "zh-CN" | "zh-TW";
const languageString: Record<LanguageType, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

const LanguageSwitch = () => {
  const [mounted, setMounted] = useState(false);

  const { t, i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(
    Cookies.get("i18next") || languages[0]
  );
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const changeLanguage = (item: string) => {
    startTransition(() => {
      i18n.changeLanguage(item);
      setCurrentLng(item);
      setOpen(false);
    });
  };

  return (
    <Select
      open={open}
      setOpen={setOpen}
      content={<div className="">{t(currentLng)}</div>}
    >
      <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
        {languages
          .filter((item) => item !== currentLng)
          .map((item) => (
            <div
              className="flex justify-center cursor-pointer"
              key={item}
              onClick={() => changeLanguage(item)}
            >
              {languageString[item as LanguageType]}
            </div>
          ))}
      </div>
    </Select>
  );
};

export default LanguageSwitch;
