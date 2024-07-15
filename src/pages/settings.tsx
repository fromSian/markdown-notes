import Content from "@/components/settings/content";
import Header from "@/components/settings/header";
import { useState } from "react";

const Settings = () => {
  const [date, setDate] = useState(0);

  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default Settings;
