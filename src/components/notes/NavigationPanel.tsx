import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import NavigationVirtualList from "./NavigationVirtualList";
const LeftPanel = () => {
  return (
    <ScrollArea className={cn("bg-gray-400 transition-all h-full w-full p-4")}>
      <NavigationVirtualList />
    </ScrollArea>
  );
};

export default LeftPanel;
