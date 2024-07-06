import { useTranslation } from "react-i18next";

import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

import { languages } from "@/i18";
const LanguageSwitch = () => {
  const [mounted, setMounted] = useState(false);

  const { t, i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(
    Cookies.get("i18next") || languages[0]
  );
  const [isPending, startTransition] = useTransition();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      i18n.changeLanguage(e.target.value);

      setCurrentLng(e.target.value);
    });
  };

  return (
    <select value={currentLng} onChange={onLanguageChange}>
      {languages.map((language) => (
        <option key={language} value={language}>
          {t(language)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitch;
