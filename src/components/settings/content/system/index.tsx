import {
  updateDefaultLanguage,
  updateDefaultTheme,
} from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const languageOptions = [
  { label: "-", value: "" },
  { label: "en", value: "en" },
  { label: "zh-tw", value: "zh-tw" },
  { label: "zh-cn", value: "zh-cn" },
];

const System = () => {
  const { t } = useTranslation("settings");
  const { language, theme } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const setLanguage = (value: string) => {
    dispatch(updateDefaultLanguage({ value }));
  };
  const setTheme = (value: string) => {
    dispatch(updateDefaultTheme({ value }));
  };

  const themeOptions = useMemo(
    () => [
      { label: "-", value: "" },
      { label: t("theme.light"), value: "light" },
      { label: t("theme.dark"), value: "dark" },
      { label: t("theme.system"), value: "system" },
    ],
    []
  );

  return (
    <>
      <div className="divider italic my-4">{t("part.system")}</div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit
            title={t("language.title")}
            info={t("language.description")}
          />
          <SelectValue
            value={language}
            setValue={setLanguage}
            items={languageOptions}
          />
        </div>

        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit title={t("theme.title")} info={t("theme.description")} />
          <SelectValue value={theme} setValue={setTheme} items={themeOptions} />
        </div>
      </div>
    </>
  );
};

export default System;
