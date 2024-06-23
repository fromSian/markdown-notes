import { store } from "@/states/store";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";

const lazyLoad = (path: string) => {
  if (path.startsWith("@/")) {
    path = path.replace("@/", "");
  }
  const Module = lazy(async () => import(/* @vite-ignore */ `/src/${path}`));
  return (
    <Suspense fallback={"loading"}>
      <Module />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: lazyLoad("@/pages"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
