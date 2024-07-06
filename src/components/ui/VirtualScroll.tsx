import { ScrollToOptions, useVirtualizer } from "@tanstack/react-virtual";
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
} from "react";

interface VirtualScrollProps {
  estimateSize: number;
  data: any[];
  parentRef: MutableRefObject<HTMLDivElement | null>;
  RenderItem: ({ index, item }) => ReactNode;
  className?: string;
  style?: Object;
}

const VirtualScroll = forwardRef(
  (
    {
      parentRef,
      estimateSize,
      count,
      RenderItem,
      className = "",
      style = {},
    }: VirtualScrollProps,
    ref
  ) => {
    const virtualizer = useVirtualizer({
      count: count,
      getScrollElement: () => parentRef.current,
      estimateSize: () => estimateSize,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          scrollToIndex(index: number, option?: ScrollToOptions) {
            virtualizer.scrollToIndex(index, option);
          },
        };
      },
      []
    );

    const items = virtualizer.getVirtualItems();
    return (
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        <div
          className={className}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              <RenderItem index={virtualRow.index} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default VirtualScroll;
