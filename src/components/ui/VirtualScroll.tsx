import { cn } from "@/lib/utils";
import { ScrollToOptions, useVirtualizer } from "@tanstack/react-virtual";
import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

interface VirtualScrollProps {
  estimateSize: number;
  data: any[];
  RenderItem: ({ item: any, index: number }) => ReactNode;
  ParentItem?: ({ children: ReactNode }) => ReactNode;
  className?: string;
  style?: Object;
}

const VirtualScroll = forwardRef(
  (
    {
      estimateSize,
      data,
      RenderItem,
      ParentItem = () => <></>,
      className,
      style,
    }: VirtualScrollProps,
    ref
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: data.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => estimateSize,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          scrollToIndex(index: number, option?: ScrollToOptions) {
            if (index >= data.length - 1) {
              return;
            }
            virtualizer.scrollToIndex(index, option);
          },
        };
      },
      [data]
    );
    const items = virtualizer.getVirtualItems();

    return (
      <div
        ref={parentRef}
        className={cn(
          "w-full h-full overflow-y-auto contain-strict",
          className
        )}
        style={style}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
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
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            <ParentItem>
              {items.map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                >
                  <RenderItem
                    item={data[virtualRow.index]}
                    index={virtualRow.index}
                  />
                </div>
              ))}{" "}
            </ParentItem>
          </div>
        </div>
      </div>
    );
  }
);

export default VirtualScroll;
