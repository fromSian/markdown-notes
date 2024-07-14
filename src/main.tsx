import { store } from "@/states/store";
import { Loader } from "lucide-react";
import { ThemeProvider } from "next-themes";
import React, { lazy, ReactNode, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
import { fetchUserInfo } from "./request/account";
import { useAppDispatch, useAppSelector } from "./states/hooks";

const Wrap = ({ children }: { children: ReactNode }) => {
  const { isLogin } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const queryUserInfo = async () => {
    try {
      const response = await fetchUserInfo();
      dispatch({
        type: "account/setUser",
        payload: response,
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
    }
  }, [isLogin]);
  return <>{children}</>;
};

const lazyLoad = (path: string) => {
  if (path.startsWith("@/")) {
    path = path.replace("@/", "");
  }
  const Module = lazy(async () => import(/* @vite-ignore */ `/src/${path}`));
  return (
    <Suspense
      fallback={
        <Loader className="absolute top-[50%] left-[50%] animate-spin" />
      }
    >
      <Wrap>
        <Module />
      </Wrap>
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: lazyLoad("@/pages"),
  },
  {
    path: "/welcome",
    element: lazyLoad("@/pages/welcome"),
  },
  {
    path: "/notes",
    element: lazyLoad("@/pages/notes"),
  },
  {
    path: "/introduction",
    element: lazyLoad("@/pages/introduction"),
  },
  {
    path: "/google/fail",
    element: lazyLoad("@/pages/google/fail"),
  },
  {
    path: "/google/success",
    element: lazyLoad("@/pages/google/success"),
  },
  {
    path: "/test",
    element: lazyLoad("@/pages/test"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
