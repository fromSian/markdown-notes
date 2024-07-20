import Fail from "@/components/icons/fail";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SuccessProps {
  goSomeWhereElse: () => void;
  handleLogin: () => void;
}

const Success = ({ goSomeWhereElse, handleLogin }: SuccessProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const login = async () => {
    try {
      setLoading(true);
      setFail(false);
      await handleLogin();
    } catch (error) {
      setFail(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-success font-bold">{t("success.title")}</p>
      <div className="flex gap-2">
        <button
          disabled={loading}
          className="btn flex gap-2 items-center"
          onClick={login}
        >
          {loading && <Loader size={20} className="animate-spin" />}
          {fail && <Fail />}
          {t("success.sign-in-directly")}
        </button>
        <button className="btn" onClick={goSomeWhereElse}>
          {t("success.go-somewhere-else")}
        </button>
      </div>
    </div>
  );
};

export default Success;
