import { logout } from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "../ui/select";
import TooltipSimple from "../ui/TooltipSimple";
const Avatar = () => {
  const { isLogin, account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/welcome");
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
              {account.type === "trial" ? "T" : account.email[0]}
            </div>
          )
        }
      >
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
          <Link to="/settings">settings</Link>
          {account.type === "trial" ? (
            <TooltipSimple
              side="left"
              content={
                <p>
                  we will not save your data. If you feel fine about this app,
                  go convert to formal user
                  <Link to="/settings">settings</Link>
                </p>
              }
            >
              <button onClick={handleLogout}>log out</button>
            </TooltipSimple>
          ) : (
            <button onClick={handleLogout}>log out</button>
          )}
        </div>
      </Select>
    )
  );
};

export default Avatar;
