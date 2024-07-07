import { useState } from "react";
import Select from "../ui/select";

const SignContent = () => {
  return (
    <>
      <button className="black_btn border">sign up</button>
      <button className="black_btn border">sign in</button>
      <button className="black_btn border">sign in with google</button>
    </>
  );
};

const SignFold = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block xs:hidden">
      <Select
        open={open}
        setOpen={setOpen}
        content={<button>sign in / up</button>}
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
      <div className="hidden flex-1 xs:flex items-center justify-center gap-2">
        <SignContent />
      </div>
      <SignFold />
    </>
  );
};

export default Sign;
