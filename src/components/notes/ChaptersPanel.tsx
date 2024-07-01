import { cn } from "@/lib/utils";
import { memo, useCallback, useRef, useState } from "react";
import Empty from "../ui/Empty";
import InfiniteVirtual from "../ui/InfiniteVirtual";
import ChaptersRenderItem from "./components/ChaptersRenderItem";

interface ChaptersPanelProps {
  activeChapterIndex: number;
  onChapterClick: (index: number) => void;
  setActiveChapterIndex: (v: number) => void;
}

const ChaptersPanel = memo(
  ({
    activeChapterIndex,
    onChapterClick,
    setActiveChapterIndex,
  }: ChaptersPanelProps) => {
    const [hasNextPage, setHasNextPage] = useState(true);
    const [data, setData] = useState<string[]>([]);
    const [fetching, setFetching] = useState(false);
    const pageRef = useRef(0);
    const fetchData = useCallback(() => {
      try {
        setFetching(true);
        setTimeout(() => {
          pageRef.current = pageRef.current + 1;

          // if (pageRef.current === 3) {
          //   setHasNextPage(false);
          // }
          setData((v) => [
            ...v,
            ...Array.from({ length: 10 }).map((_, i) => "chapters"),
          ]);
          setFetching(false);
        }, 1000);
      } catch (error) {}
    }, []);

    return (
      <div
        className={cn(
          "border-l transition-all h-full overflow-x-hidden relative"
        )}
      >
        <p className="text-tprimary font-bold italic text-center mb-2">
          NAVIGATION
        </p>
        {!data.length && <Empty />}
        <InfiniteVirtual
          estimateSize={24}
          fetching={fetching}
          hasNextPage={hasNextPage}
          data={data}
          fetchData={fetchData}
          style={{
            height: "calc(100% - 2.5rem)",
          }}
          RenderItem={({ data, index }) => (
            <ChaptersRenderItem
              index={index}
              data={data}
              onChapterClick={onChapterClick}
            />
          )}
        />
      </div>
    );
  }
);

export default ChaptersPanel;
