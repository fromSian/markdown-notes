import { fetchTrial, goGoogleAuth } from "@/request/account";
import { useAppDispatch } from "@/states/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Select from "../ui/select";

const SignContent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/welcome?open=signin");
  };

  const handleSignUp = () => {
    navigate("/welcome?open=signup");
  };

  const handleTrial = async () => {
    const {
      defaultExpanded,
      showExactTime,
      sortInfo,
      language,
      theme,
      ...rest
    } = await fetchTrial();
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
    navigate("/");
  };

  return (
    <>
      <button className="btn border truncate" onClick={handleSignIn}>
        {t("sign-in")}
      </button>
      <button className="btn border truncate" onClick={handleSignUp}>
        {t("sign-up")}
      </button>
      <button className="btn border truncate" onClick={goGoogleAuth}>
        {t("sign-in-with-google")}
      </button>
      <button className="btn border truncate" onClick={handleTrial}>
        {t("trial")}
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
