import {
  updateDefaultLanguage,
  updateDefaultTheme,
} from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const languageOptions = [
  { label: "-", value: "" },
  { label: "en", value: "en" },
  { label: "zh-TW", value: "zh-TW" },
  { label: "zh-CN", value: "zh-CN" },
];

const System = () => {
  const { t } = useTranslation(["settings", "message"]);
  const { language, theme } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const setLanguage = async (value: string) => {
    try {
      await dispatch(updateDefaultLanguage({ value })).unwrap();
      toast.success(
        t("update-language-success", {
          ns: "message",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const setTheme = async (value: string) => {
    try {
      await dispatch(updateDefaultTheme({ value })).unwrap();
      toast.success(
        t("update-theme-success", {
          ns: "message",
        })
      );
    } catch (error) {
      console.log(error);
    }
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
