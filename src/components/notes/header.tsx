import * as UIVariable from "@/lib/ui";
import { Loader } from "lucide-react";
import { Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../icons/logo";

const NotePart = lazy(() => import("@/components/common/NotePart"));
const CommonPart = lazy(() => import("@/components/common/CommonPart"));
const Avatar = lazy(() => import("@/components/common/Avatar"));
const Header = () => {
  const { pathname } = useLocation();

  return (
    <header
      className="flex px-2 xs:px-4 gap-4 overflow-hidden transition-all items-center justify-between"
      style={{ height: UIVariable.headerHeight }}
    >
      <div className="flex-shrink-0 flex">
        <Link to="/">
          <Logo className="-mt-2" />
        </Link>
      </div>
      <Suspense fallback={<Loader className="animate-spin" />}>
        {pathname === "/" && <NotePart />}
      </Suspense>

      <Suspense fallback={<Loader className="animate-spin" />}>
        <CommonPart />
      </Suspense>

      <Suspense fallback={<Loader className="animate-spin" />}>
        <Avatar />
      </Suspense>
    </header>
  );
};

export default Header;
