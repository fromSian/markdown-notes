import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "../ui/select";
const Avatar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Select
      open={open}
      setOpen={setOpen}
      content={<div className="w-8 h-8 rounded-full bg-red-200"></div>}
    >
      <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
        <Link to="/settings">settings</Link>
        <button>log out</button>
      </div>
    </Select>
  );
};

export default Avatar;
