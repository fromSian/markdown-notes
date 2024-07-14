import * as UIVariable from "@/lib/ui";
import { Loader } from "lucide-react";
import { Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../icons/logo";

const NotePart = lazy(() => import("./NotePart"));
const CommonPart = lazy(() => import("../common/CommonPart"));
const Avatar = lazy(() => import("./Avatar"));
const Sign = lazy(() => import("../common/Sign"));
const Header = () => {
  const { pathname } = useLocation();

  return (
    <header
      className="flex px-2 xs:px-4 gap-4 overflow-hidden transition-all items-center justify-between"
      style={{ height: UIVariable.headerHeight }}
    >
      <div className="flex-shrink-0 flex">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Suspense fallback={<Loader className="animate-spin" />}>
        {pathname === "/notes" && <NotePart />}
      </Suspense>

      <Suspense fallback={<Loader className="animate-spin" />}>
        {pathname === "/introduction" && <Sign />}
      </Suspense>

      <Suspense fallback={<Loader className="animate-spin" />}>
        <CommonPart />
      </Suspense>

      <Suspense fallback={<Loader className="animate-spin" />}>
        {false && <Avatar />}
      </Suspense>
    </header>
  );
};

export default Header;
