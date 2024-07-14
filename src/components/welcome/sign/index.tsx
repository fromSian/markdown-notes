import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

const Sign = () => {
  const [open, setOpen] = useState<"signin" | "signup" | undefined>(undefined);

  const goSomeWhereElse = () => {
    setOpen(undefined);
  };

  return (
    <div className="flex flex-col w-full p-4">
      <button className="black_btn mb-4" onClick={() => setOpen("signin")}>
        sign in
      </button>
      <SignIn open={open === "signin"} />
      <button className="black_btn mb-4" onClick={() => setOpen("signup")}>
        sign up
      </button>
      <SignUp open={open === "signup"} goSomeWhereElse={goSomeWhereElse} />
      <button className="black_btn mb-4" onClick={() => setOpen(undefined)}>
        sign in with google
      </button>
      <button className="black_btn mb-4" onClick={() => setOpen(undefined)}>
        trial
      </button>
    </div>
  );
};

export default Sign;
