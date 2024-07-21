import Fail from "@/components/icons/fail";
import Header from "@/components/introduce/header";
import { useTranslation } from "react-i18next";

const GoogleFail = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="flex mt-8 flex-col gap-4 justify-center items-center">
        <Fail
          className="w-16 h-16 mb-4"
          style={{
            fontSize: 40,
          }}
        />
        <p className="text-xl font-bold">{t("google.fail.title")}</p>
        <p>{t("google.fail.description")}</p>
      </div>
    </>
  );
};

export default GoogleFail;
