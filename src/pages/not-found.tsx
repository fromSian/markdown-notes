import Header from "@/components/welcome/header";
import { Bot, SmilePlus } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="w-full flex flex-col gap-4 pt-20 px-2 sm:px-4 justify-center items-center">
        <Bot size={60} className="text-ttertiary" />
        <p className="text-3xl">Sorry, no content here.</p>
        <Link to="/" className="text-xl btn-mask-circle">
          home
        </Link>
        <p className="text-ttertiary flex gap-2">
          if you think there must be something here, please send email to us
          <a href="mailto:notetodos@163.com" className=" underline">
            notetodos@163.com
          </a>
          <SmilePlus />
        </p>
      </div>
    </>
  );
};

export default NotFound;
