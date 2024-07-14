import { Loader } from "lucide-react";
import { lazy, Suspense } from "react";
import Logo from "../icons/logo";
const CommonParts = lazy(() => import("@/components/common/CommonPart"));
const Header = () => {
  return (
    <div className="relative">
      <div className="float-right px-6 pt-4">
        <Suspense fallback={<Loader className="animate-spin" />}>
          <CommonParts />
        </Suspense>
      </div>
      <div className="clear-none px-6">
        <Logo width={96} height={96} />
      </div>
    </div>
  );
};

export default Header;
