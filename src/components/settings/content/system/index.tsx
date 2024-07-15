import { useState } from "react";
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
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("");

  return (
    <>
      <div className="divider italic my-4">system</div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-4 rounded-md bg-slate-600">
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

        <div className="flex justify-between py-2 px-4 rounded-md bg-slate-600">
          <TitleKit title={"theme"} info={"theme"} />
          <SelectValue value={theme} setValue={setTheme} items={themeOptions} />
        </div>
      </div>
    </>
  );
};

export default System;
