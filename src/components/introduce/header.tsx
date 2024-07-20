import { useAppSelector } from "@/states/hooks";
import { Loader } from "lucide-react";
import { lazy, Suspense } from "react";
import Logo from "../icons/logo";
const CommonParts = lazy(() => import("@/components/common/CommonPart"));
const Sign = lazy(() => import("@/components/common/Sign"));
const Header = () => {
  const { isLogin } = useAppSelector((state) => state.account);
  return (
    <div className="relative">
      <div
        className="absolute top-4"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}
      ></div>

      <div
        className="mr-2 pt-4 flex justify-end float-right gap-4 items-center md:mr-6"
        style={{
          width: "calc(100vw - 150px)",
        }}
      >
        {!isLogin && (
          <Suspense fallback={<Loader className="animate-spin" />}>
            <Sign />
          </Suspense>
        )}
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
