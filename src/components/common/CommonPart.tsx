import { useAppSelector } from "@/states/hooks";
import { AlignJustify, Info } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select from "../ui/select";
import TooltipSimple from "../ui/tooltip-simple";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";

const CommanPartContent = () => {
  const { t } = useTranslation("header");
  const { language, theme, isLogin } = useAppSelector((state) => state.account);
  return (
    <>
      <TooltipSimple content={t("introduce")}>
        <Link to="/introduce" target="__blank">
          <Info />
        </Link>
      </TooltipSimple>
      <ThemeSwitch _theme={theme} />
      <LanguageSwitch language={language} />
    </>
  );
};

const CommanPartFold = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      <Select open={open} setOpen={setOpen} content={<AlignJustify />}>
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2 items-center">
          <CommanPartContent />
        </div>
      </Select>
    </div>
  );
};

const CommonPart = () => {
  return (
    <>
      <div className="hidden sm:flex items-center gap-4">
        <CommanPartContent />
      </div>
      <CommanPartFold />
    </>
  );
};

export default CommonPart;
