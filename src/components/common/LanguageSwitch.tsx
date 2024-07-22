import { useTranslation } from "react-i18next";

import { languages } from "@/i18";
import { memo, useEffect, useState } from "react";
import Select from "../ui/select";

const LanguageSwitch = memo(({ language }: { language: string }) => {
  const { t, i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const changeLanguage = (item: string) => {
    i18n.changeLanguage(item);
    setCurrentLng(item);
    setOpen(false);
  };

  useEffect(() => {
    if (language) {
      setCurrentLng(language);
    }
  }, [language]);

  useEffect(() => {
    const cache = localStorage.getItem("i18nextLng");
    if (cache && languages.includes(cache)) {
      setCurrentLng(cache);
    }
  }, []);

  return (
    !language && (
      <Select
        open={open}
        setOpen={setOpen}
        content={
          <div className="cursor-pointer flex transition-all items-center truncate">
            {currentLng}
          </div>
        }
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
                {item}
              </div>
            ))}
        </div>
      </Select>
    )
  );
});

export default LanguageSwitch;
