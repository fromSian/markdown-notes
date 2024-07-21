import Header from "@/components/welcome/header";
import { Bot, SmilePlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="w-full flex flex-col gap-4 pt-20 px-2 sm:px-4 justify-center items-center">
        <Bot size={60} className="text-ttertiary" />
        <p className="text-3xl">{t("not-found.title")}</p>
        <Link to="/" className="text-xl btn-mask-circle">
          {t("not-found.home")}
        </Link>
        <p className="text-ttertiary flex gap-2">
          {t("not-found.description")}
          <a
            href="mailto:notetodos@163.com"
            className=" underline hover:text-tprimary"
          >
            notetodos@163.com
          </a>
          <SmilePlus />
        </p>
      </div>
    </>
  );
};

export default NotFound;
