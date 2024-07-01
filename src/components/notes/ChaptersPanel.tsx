import { cn } from "@/lib/utils";
import { NoteChaptersType } from "@/types/notes";
import { memo, useCallback, useRef, useState } from "react";
import Empty from "../ui/Empty";
import InfiniteVirtual from "../ui/InfiniteVirtual";
import ChaptersRenderItem from "./components/ChaptersRenderItem";

interface ChaptersPanelProps {
  chapters: NoteChaptersType[];
  setChapters: (chapters: NoteChaptersType[]) => void;
  onChapterClick: (index: number) => void;
}

const ChaptersPanel = memo(
  ({ chapters, setChapters, onChapterClick }: ChaptersPanelProps) => {
    const [hasNextPage, setHasNextPage] = useState(true);
    const [fetching, setFetching] = useState(false);
    const pageRef = useRef(0);
    const fetchData = useCallback(() => {
      try {
        setFetching(true);
        setTimeout(() => {
          pageRef.current = pageRef.current + 1;

          if (pageRef.current === 2) {
            setHasNextPage(false);
          }
          setChapters((v) => [
            ...v,
            ...Array.from({ length: 10 }).map((_, i) => ({
              id: i,
              summary: "summary what is this",
              status: "nochanges",
            })),
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
        {!chapters.length && <Empty />}
        <InfiniteVirtual
          estimateSize={24}
          fetching={fetching}
          hasNextPage={hasNextPage}
          data={chapters}
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
