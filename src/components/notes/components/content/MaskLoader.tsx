import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
const MaskLoader = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 bg-primary-foreground opacity-70 w-full h-full z-10 hidden",
        loading && "block"
      )}
    >
      <Loader
        size={20}
        style={{
          top: "calc(50% - 10px)",
          right: "calc(50% - 10px)",
        }}
        className={cn("animate-spin absolute")}
      />
    </div>
  );
};

export default MaskLoader;
