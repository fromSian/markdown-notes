import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Dispatch, lazy, SetStateAction, Suspense } from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/logo";

const NotePart = lazy(() => import("@/components/common/NotePart"));
const CommonPart = lazy(() => import("@/components/common/CommonPart"));
const Avatar = lazy(() => import("@/components/common/Avatar"));

interface HeaderProps {
  showNavigation: boolean;
  setShowNavigation: Dispatch<SetStateAction<boolean>>;
  activeId?: string | number;
}

const Header = ({
  showNavigation,
  setShowNavigation,
  activeId,
}: HeaderProps) => {
  return (
    <header
      className="flex px-2 xs:px-4 gap-4 sm:gap-6 overflow-hidden transition-all items-center justify-between"
      style={{ height: "4rem" }}
    >
      <div className="flex-shrink-0 flex">
        <Link to="/">
          <Logo className="-mt-2" />
        </Link>
      </div>
      <div
        className={cn("flex-1 flex justify-end", activeId && "justify-between")}
      >
        {activeId && (
          <Suspense fallback={<Loader className="animate-spin" />}>
            <NotePart
              showNavigation={showNavigation}
              setShowNavigation={setShowNavigation}
            />
          </Suspense>
        )}
        <Suspense fallback={<Loader className="animate-spin" />}>
          <CommonPart />
        </Suspense>
      </div>

      <Suspense fallback={<Loader className="animate-spin" />}>
        <Avatar />
      </Suspense>
    </header>
  );
};

export default Header;
