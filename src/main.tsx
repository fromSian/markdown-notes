import { store } from "@/states/store";
import { Loader } from "lucide-react";
import { ThemeProvider } from "next-themes";
import React, { lazy, ReactNode, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
import "./i18";
import { fetchUserInfo } from "./request/account";
import { useAppDispatch, useAppSelector } from "./states/hooks";

const Wrap = ({
  children,
  needAuth,
}: {
  children: ReactNode;
  needAuth: boolean;
}) => {
  const { isLogin } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryUserInfo = async () => {
    try {
      const {
        defaultExpanded,
        showExactTime,
        sortInfo,
        language,
        theme,
        ...rest
      } = await fetchUserInfo();
      dispatch({
        type: "account/setAccount",
        payload: rest,
      });
      const systemConfig = {
        language: language,
        theme: theme,
      };
      dispatch({
        type: "account/setConfig",
        payload: systemConfig,
      });
      const noteConfig = {
        showExactTime: showExactTime,
        defaultExpanded: defaultExpanded,
        sortInfo: sortInfo,
      };
      dispatch({
        type: "note/setConfig",
        payload: noteConfig,
      });
    } catch (error) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (isLogin) {
      return;
    }
    const token = sessionStorage.getItem("token");
    if (token) {
      queryUserInfo();
    } else {
      needAuth && navigate("/welcome");
    }
  }, [isLogin, needAuth]);
  return (
    <>
      {isLogin || !needAuth ? (
        children
      ) : (
        <Loader className="absolute top-[50%] left-[50%] animate-spin" />
      )}
    </>
  );
};

const lazyLoad = (path: string, needAuth: boolean = true) => {
  const Module = lazy(async () => import(`./pages/${path}.tsx`));
  return (
    <Suspense
      fallback={
        <Loader className="absolute top-[50%] left-[50%] animate-spin" />
      }
    >
      <Wrap needAuth={needAuth}>
        <Module />
      </Wrap>
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: lazyLoad("@/pages/notes"),
    errorElement: lazyLoad("not-found", false),
  },
  {
    path: "/welcome",
    element: lazyLoad("welcome", false),
  },
  {
    path: "/introduce",
    element: lazyLoad("introduce", false),
  },
  {
    path: "/google/fail",
    element: lazyLoad("google/fail", false),
  },
  {
    path: "/google/success",
    element: lazyLoad("google/success", false),
  },
  {
    path: "/settings",
    element: lazyLoad("settings"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <RouterProvider router={router} />
        <Toaster richColors position="bottom-right" closeButton={true} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
