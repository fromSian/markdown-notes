import Index from "@/components/welcome";
import Header from "@/components/welcome/header";

import { useEffect } from "react";
const Welcome = () => {
  useEffect(() => {
    sessionStorage.removeItem("token");
  }, []);

  return (
    <div>
      <Header />
      <Index />
    </div>
  );
};

export default Welcome;
