import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "../ui/select";

const SignContent = () => {
  const { t } = useTranslation();
  return (
    <>
      <button className="btn border truncate">{t("sign-up")}</button>
      <button className="btn border truncate">{t("sign-in")}</button>
      <button className="btn border truncate">{t("trial")}</button>
      <button className="btn border truncate">
        {t("sign-in-with-google")}
      </button>
    </>
  );
};

const SignFold = () => {
  const { t } = useTranslation("header");
  const [open, setOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      <Select
        open={open}
        setOpen={setOpen}
        content={<button className="btn">{t("sign-in-up")}</button>}
      >
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2 items-center p-2">
          <SignContent />
        </div>
      </Select>
    </div>
  );
};

const Sign = () => {
  return (
    <>
      <div className="hidden flex-1 sm:flex items-center justify-center gap-2 md:gap-4">
        <SignContent />
      </div>
      <SignFold />
    </>
  );
};

export default Sign;
