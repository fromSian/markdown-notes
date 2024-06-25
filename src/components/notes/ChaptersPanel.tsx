import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import InfiniteVirtual from "../ui/InfiniteVirtual";
import { ScrollArea } from "../ui/scroll-area";
import ChaptersRenderItem from "./components/ChaptersRenderItem";
const ChaptersPanel = () => {
  const { showChapters } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [data, setData] = useState<string[]>([]);
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
          ...Array.from({ length: 10 }).map((_, i) => "chapters"),
        ]);
        setFetching(false);
      }, 1000);
    } catch (error) {}
  }, []);

  const onPanelClick = useCallback(() => {
    if (showChapters) {
      return;
    }
    dispatch({
      type: "ui/toggleShowChapters",
    });
  }, [showChapters]);
  return (
    <ScrollArea
      className={cn(
        "border-l transition-all h-full overflow-x-hidden relative",
        showChapters ? "" : "cursor-pointer"
      )}
      onClick={onPanelClick}
    >
      {showChapters && (
        <X
          className="cursor-pointer absolute right-1 top-0 z-10"
          onClick={() => {
            dispatch({
              type: "ui/toggleShowChapters",
            });
          }}
        />
      )}
      <InfiniteVirtual
        estimateSize={24}
        fetching={fetching}
        hasNextPage={hasNextPage}
        data={data}
        fetchData={fetchData}
        RenderItem={({ data, index }) => <ChaptersRenderItem index={index} />}
      />
    </ScrollArea>
  );
};

export default ChaptersPanel;
