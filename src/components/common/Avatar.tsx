import { logout } from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select from "../ui/select";
const Avatar = () => {
  const { t } = useTranslation("header");
  const { isLogin, account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      dispatch({
        type: "note/setActive",
        payload: {
          info: undefined,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    isLogin && (
      <Select
        open={open}
        setOpen={setOpen}
        content={
          account.image ? (
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={account.image}
              alt={account.email}
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full bg-opacity-40 cursor-pointer text-center truncate text-lg"
              style={{
                backgroundColor: "#D07D07",
              }}
            >
              {account.type === "trial"
                ? "T"
                : account.email?.length
                ? account.email[0]
                : "N"}
            </div>
          )
        }
      >
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
          <Link to="/settings">{t("settings")}</Link>
          {account.type === "trial" ? (
            // <TooltipSimple
            //   side="left"
            //   content={
            //     <p>
            //       {t("trial-remind")}
            //       <Link to="/settings" className="underline text-link">
            //         {t("settings")}
            //       </Link>
            //     </p>
            //   }
            // >
            <p onClick={handleLogout}>{t("sign-out")}</p>
          ) : (
            // </TooltipSimple>
            <button onClick={handleLogout}>{t("sign-out")}</button>
          )}
        </div>
      </Select>
    )
  );
};

export default Avatar;
