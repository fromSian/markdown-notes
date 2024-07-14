import { store } from "@/states/store";
import { Loader } from "lucide-react";
import { ThemeProvider } from "next-themes";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
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
      <Module />
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
