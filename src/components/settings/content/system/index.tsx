import {
  updateDefaultLanguage,
  updateDefaultTheme,
} from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const languageOptions = [
  { label: "-", value: "" },
  { label: "en", value: "en" },
  { label: "zh-tw", value: "zh-tw" },
  { label: "zh-cn", value: "zh-cn" },
];

const themeOptions = [
  { label: "-", value: "" },
  { label: "light", value: "light" },
  { label: "dark", value: "dark" },
  { label: "system", value: "system" },
];

const System = () => {
  const { language, theme } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const setLanguage = (value: string) => {
    dispatch(updateDefaultLanguage({ value }));
  };
  const setTheme = (value: string) => {
    dispatch(updateDefaultTheme({ value }));
  };
  return (
    <>
      <div className="divider italic my-4">system</div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit
            title={"language"}
            info={"when you loaded the app, we will use this as the lan"}
          />
          <SelectValue
            value={language}
            setValue={setLanguage}
            items={languageOptions}
          />
        </div>

        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit title={"theme"} info={"theme"} />
          <SelectValue value={theme} setValue={setTheme} items={themeOptions} />
        </div>
      </div>
    </>
  );
};

export default System;
