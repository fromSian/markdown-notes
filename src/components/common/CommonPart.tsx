import { AlignJustify, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "../ui/select";
import TooltipSimple from "../ui/TooltipSimple";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";

const CommanPartContent = () => {
  return (
    <>
      <TooltipSimple content="introduce">
        <Link to="/introduction" target="__blank">
          <Info />
        </Link>
      </TooltipSimple>

      <ThemeSwitch />
      <LanguageSwitch />
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
