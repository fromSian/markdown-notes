import { useVirtualizer } from "@tanstack/react-virtual";
import { ReactNode, useEffect, useRef } from "react";

interface NavigationVirtualListProps {
  estimateSize: number;
  hasNextPage: boolean;
  data: any[];
  fetching: boolean;
  fetchData: () => void;
  RenderItem: (data: any) => ReactNode;
}

const InfiniteVirtual = ({
  estimateSize,
  hasNextPage,
  data,
  fetching,
  fetchData,
  RenderItem,
}: NavigationVirtualListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? data.length + 1 : data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }

    if (lastItem.index >= data.length - 1 && hasNextPage && !fetching) {
      fetchData();
    }
  }, [hasNextPage, data.length, fetching, virtualizer.getVirtualItems()]);
  return (
    <div ref={parentRef} className="w-full h-full">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${
              virtualizer.getVirtualItems()[0]?.start ?? 0
            }px)`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > data.length - 1;
            const post = data[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                className="break-words whitespace-pre-wrap"
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    "Loading more..."
                  ) : (
                    "Nothing more to load"
                  )
                ) : (
                  <RenderItem data={post} index={virtualRow.index} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfiniteVirtual;
