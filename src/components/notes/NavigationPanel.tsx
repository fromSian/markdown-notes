import * as UIVariable from "@/lib/ui";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/states/hooks";

const LeftPanel = () => {
  const { showNavigation, headerExpanded } = useAppSelector(
    (state) => state.ui
  );
  return (
    <section
      className={cn(
        showNavigation ? "w-[100px]" : "w-0",
        "bg-gray-900 transition-all h-full"
      )}
      style={{
        width: showNavigation ? UIVariable.navigationWidth : 0,
      }}
    ></section>
  );
};

export default LeftPanel;
