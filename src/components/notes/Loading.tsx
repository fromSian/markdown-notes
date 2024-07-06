import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <Loader
      size={28}
      className="absolute animate-spin"
      style={{
        top: "calc(50% - 14px)",
        right: "calc(50% - 14px)",
      }}
    />
  );
};

export default Loading;
