import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRef } from "react";
const LeftPanel = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollArea
      ref={parentRef}
      className={cn("bg-gray-400 transition-all h-full w-full")}
    >
      {/* <NavigationVirtualList parentRef={parentRef} /> */}
    </ScrollArea>
  );
};

export default LeftPanel;
