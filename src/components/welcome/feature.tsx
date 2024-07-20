import { useTranslation } from "react-i18next";
import SuccessIcon from "../icons/success";

const count = 6;

const Feature = () => {
  const { t } = useTranslation("introduce");
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-10 p-4 justify-between h-full">
      <p className="text-3xl font-bold text-center sm:text-left xl:text-4xl">
        {t("title")}
      </p>

      <p className="text-tsecondary hidden sm:block italic indent-4 xl:text-lg tracking-wider">
        {t("description")}
      </p>

      <ul className="pl-4 sm:flex-col gap-4 hidden sm:flex xl:text-lg">
        {Array.from({ length: count }).map((_, i) => (
          <li key={`feature${i}`} className="flex gap-2 items-center ">
            <SuccessIcon />
            {t(`feature${i}`)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feature;
