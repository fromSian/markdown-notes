import TooltipSimple from "@/components/ui/TooltipSimple";
import { cn } from "@/lib/utils";
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
    <div className="flex flex-col p-4 justify-center xl:w-[40vw] lg:w-[45vw] md:w-[50vw]">
      <button
        className={cn(
          "btn-overlap mb-4 transition-all opacity-50 hover:opacity-100",
          open === "signin" && "opacity-100"
        )}
        onClick={() => setOpen("signin")}
      >
        sign in
      </button>
      <SignIn open={open === "signin"} />
      <button
        className={cn(
          "btn-overlap mb-4 transition-all opacity-50 hover:opacity-100",
          open === "signup" && "opacity-100"
        )}
        onClick={() => setOpen("signup")}
      >
        sign up
      </button>
      <SignUp open={open === "signup"} goSomeWhereElse={goSomeWhereElse} />
      <TooltipSimple content={"132"}>
        <p
          className={cn(
            "btn-overlap w-full transition-all mb-4 opacity-50 hover:opacity-100",
            open === undefined && "opacity-100"
          )}
          onClick={handleGoogleAuth}
        >
          sign in with google
        </p>
      </TooltipSimple>
      <TooltipSimple content={"132"}>
        <p
          className={cn(
            "btn-overlap w-full transition-all mb-4 opacity-50 hover:opacity-100",
            open === undefined && "opacity-100"
          )}
          onClick={handleTrial}
        >
          trial
        </p>
      </TooltipSimple>
    </div>
  );
};

export default Sign;
