import { Loader } from "lucide-react";
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/logo";

const CommonPart = lazy(() => import("@/components/common/CommonPart"));
const Avatar = lazy(() => import("@/components/common/Avatar"));
const Header = () => {
  return (
    <header
      className="flex px-2 xs:px-4 gap-4 overflow-hidden transition-all items-center justify-between"
      style={{ height: "4rem" }}
    >
      <div className="flex-shrink-0 flex">
        <Link to="/">
          <Logo className="-mt-2" />
        </Link>
      </div>
      <div className="flex-1 flex gap-2 sm:gap-4 justify-end items-center">
        <Suspense fallback={<Loader className="animate-spin" />}>
          <CommonPart />
        </Suspense>

        <Suspense fallback={<Loader className="animate-spin" />}>
          <Avatar />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
