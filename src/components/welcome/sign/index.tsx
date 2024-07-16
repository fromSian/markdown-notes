import request from "@/request/request";
import { useAppDispatch } from "@/states/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import SignIn from "./signin";
import SignUp from "./signup";

const Sign = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<"signin" | "signup" | undefined>("signin");

  const goSomeWhereElse = () => {
    setOpen(undefined);
  };

  const goGoogleAuth = () => {
    const url = "http://localhost:8000/account/google/access/";
    window.open(url, "_self");
  };
  const handleGoogleAuth = () => {
    goGoogleAuth();
    setOpen(undefined);
  };

  const handleTrial = async () => {
    setOpen(undefined);
    const url = "/account/trial/";
    const response = await request.post(url);
    dispatch({
      type: "account/setAccount",
      payload: response,
    });
    sessionStorage.setItem("token", response?.token);
    toast.success("trial successfully");
    navigate("/");
  };
  return (
    <div className="flex flex-col p-4" style={{ width: "50%" }}>
      <button className="black_btn mb-4" onClick={() => setOpen("signin")}>
        sign in
      </button>
      <SignIn open={open === "signin"} />
      <button className="black_btn mb-4" onClick={() => setOpen("signup")}>
        sign up
      </button>
      <SignUp open={open === "signup"} goSomeWhereElse={goSomeWhereElse} />
      <button className="black_btn mb-4" onClick={handleGoogleAuth}>
        sign in with google
      </button>
      <button className="black_btn mb-4" onClick={handleTrial}>
        trial
      </button>
    </div>
  );
};

export default Sign;
