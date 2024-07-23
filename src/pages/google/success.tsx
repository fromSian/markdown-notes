import SuccessIcon from "@/components/icons/success";
import Header from "@/components/welcome/header";
import { useAppDispatch } from "@/states/hooks";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const GoogleSuccess = () => {
  const { t } = useTranslation(["translation", "message"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(60);

  const timeRef = useRef<ReturnType<typeof setInterval>>();

  const checkToken = async (token: string) => {
    try {
      setLoading(true);
      const response = await axios.get("/api/account/info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.success) {
        const {
          success,
          defaultExpanded,
          showExactTime,
          sortInfo,
          language,
          theme,
          ...rest
        } = response.data;
        dispatch({
          type: "account/setAccount",
          payload: rest,
        });
        const systemConfig = {
          language: language,
          theme: theme,
        };
        dispatch({
          type: "account/setConfig",
          payload: systemConfig,
        });
        const noteConfig = {
          showExactTime: showExactTime,
          defaultExpanded: defaultExpanded,
          sortInfo: sortInfo,
        };
        dispatch({
          type: "note/setConfig",
          payload: noteConfig,
        });
        sessionStorage.setItem("token", token);
        toast.success(t("signin-google-success", { ns: "message" }));
      } else {
        throw new Error("token not valid");
      }
    } catch (error) {
      navigate("/google/fail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("token");
    const token = searchParams.get("token");
    if (token) {
      checkToken(token);
      timeRef.current = setInterval(() => {
        setSeconds((v) => {
          if (v < 2) {
            clearInterval(timeRef.current);
            timeRef.current = undefined;
            navigate("/");
          }
          return v - 1;
        });
      }, 1000);
    } else {
      navigate("/google/fail");
    }

    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = undefined;
      }
    };
  }, []);
  const goHome = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = undefined;
    }
    navigate("/");
  };
  return (
    <>
      <Header />
      {loading ? (
        <Loader
          className="animate-spin absolute"
          style={{
            top: "30%",
            left: "50%",
          }}
        />
      ) : (
        <div className="mt-8 flex flex-col gap-4 justify-center text-center items-center">
          <SuccessIcon className="w-16 h-16 mb-4" size={40} />
          <p className="text-xl font-bold">{t("success.title")}</p>
          <p>
            <Trans i18nKey={"success.description"} seconds={seconds}>
              we will get you in after {{ seconds }}s, or click here dive in
              right now
            </Trans>
          </p>
          <button className="btn" onClick={goHome}>
            {t("success.home")}
          </button>
        </div>
      )}
    </>
  );
};

export default GoogleSuccess;
