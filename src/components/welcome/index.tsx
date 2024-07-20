import { useTranslation } from "react-i18next";
import Feature from "./feature";
import Sign from "./sign";

const Index = () => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="w-full flex gap-4 sm:gap-6 flex-col  sm:flex-row mt-0 sm:mt-8 px-2 gap:px-4"
        style={{
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <div className="block sm:hidden w-full transition-all">
          <Feature />
        </div>
        <div
          className="hidden sm:block h-full rounded-md bg-welcome flex-1 transition-all"
          style={{
            minHeight: "calc(100vh - 200px)",
          }}
        >
          <Feature />
        </div>
        <Sign />
      </div>
      <div className="mt-4 text-center text-ttertiary opacity-75">
        {t("contact")}
        <a
          href="mailto:notetodos@163.com"
          className=" underline mx-2 hover:text-tprimary transition-all"
        >
          notetodos@163.com
        </a>
      </div>
    </>
  );
};

export default Index;
