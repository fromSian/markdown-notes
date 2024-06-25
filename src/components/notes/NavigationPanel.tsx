import InfiniteVirtual from "@/components/ui/InfiniteVirtual";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NoteNavigationType } from "@/types/notes";
import { useCallback, useRef, useState } from "react";
import NavigationRenderItem from "./components/NavigationRenderItem";
import RecentDays from "./components/RecentDays";
const recentFirstIds = ["1-0", "2-6", "3-5"];
const LeftPanel = () => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [data, setData] = useState<NoteNavigationType[]>([]);
  const [fetching, setFetching] = useState(false);
  const pageRef = useRef(0);
  const fetchData = useCallback(() => {
    try {
      setFetching(true);
      setTimeout(() => {
        pageRef.current = pageRef.current + 1;

        if (pageRef.current === 3) {
          setHasNextPage(false);
        }
        setData((v) => [
          ...v,
          ...Array.from({ length: 10 }).map((_, i) => ({
            id: `${pageRef.current}-${i}`,
            title: `title${pageRef.current}-${i}`,
            created: "",
            updated: "2017-6-5",
            summary: "summary summary summary",
          })),
        ]);
        setFetching(false);
      }, 1000);
    } catch (error) {}
  }, []);
  return (
    <ScrollArea className={cn("border-r-2 transition-all h-full w-full py-4")}>
      <InfiniteVirtual
        estimateSize={24}
        fetching={fetching}
        hasNextPage={hasNextPage}
        data={data}
        fetchData={fetchData}
        RenderItem={({ data }) => (
          <>
            {data.id === recentFirstIds[0] && <RecentDays message={"Today"} />}
            {data.id === recentFirstIds[1] && (
              <RecentDays message={"Previous 7 days"} />
            )}
            {data.id === recentFirstIds[2] && (
              <RecentDays message={"Previous 30 days"} />
            )}
            <NavigationRenderItem data={data}></NavigationRenderItem>
          </>
        )}
      />
    </ScrollArea>
  );
};

export default LeftPanel;
