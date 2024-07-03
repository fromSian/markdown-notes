import { useVirtualizer } from "@tanstack/react-virtual";
import { Loader } from "lucide-react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Empty from "./Empty";

interface BothSideScrollProps {
  count: number;
  data: any[];
  loadingInfo: "first" | "after" | "before" | undefined;
  start: number;
  end: number;
  fetchBefore: (base: number, defaultLength?: number) => void;
  fetchAfter: (base: number, defaultLength?: number) => void;
  setNowFirstDataIndex: Dispatch<SetStateAction<number>>;
  setNowLastDataIndex: Dispatch<SetStateAction<number>>;
  RenderItem: (item: any, index: number) => ReactNode;
}
const BothSideScroll = forwardRef(
  (
    {
      count,
      data,
      loadingInfo,
      start,
      end,
      fetchBefore,
      fetchAfter,
      setNowFirstDataIndex,
      setNowLastDataIndex,
      RenderItem,
    }: BothSideScrollProps,
    ref
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
      count: count,
      estimateSize: () => 10,
      getScrollElement: () => parentRef.current,
    });

    const items = virtualizer.getVirtualItems();

    useImperativeHandle(ref, () => {
      return {
        scrollToIndex(index: number) {
          virtualizer.scrollToIndex(index, {
            align: "start",
          });
        },
      };
    });

    useEffect(() => {
      if (!items || !items.length) return;

      if (loadingInfo) {
        return;
      }
      if (start < 1) {
        return;
      }
      const [firstItem] = [...items];
      if (firstItem.index < start) {
        fetchBefore(start);
      }
      setNowFirstDataIndex((v) => {
        if (v === start) {
          const [firstItem] = [...items];
          if (firstItem.index < start) {
            fetchBefore(start);
          }
          return v;
        }
        return v - 1;
      });
    }, [items, start, loadingInfo]);

    useEffect(() => {
      if (!items || !items.length) return;
      if (loadingInfo) {
        return;
      }
      if (end < 0 || end > count - 2) {
        return;
      }
      setNowLastDataIndex((v) => {
        if (v === end) {
          const [lastItem] = [...items].reverse();
          if (lastItem.index > end) {
            fetchAfter(end);
          }
          return v;
        }
        return v + 1;
      });
    }, [items, end, count, loadingInfo]);

    return (
      <div
        ref={parentRef}
        className="w-full h-full overflow-y-auto contain-strict"
      >
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
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {loadingInfo === "first" ? (
              <Loader
                size={24}
                className="absolute top-4 animate-spin"
                style={{
                  right: "calc(50% - 12px)",
                }}
              />
            ) : count && data.length ? (
              items.map((virtualRow) => {
                const item = data.find(
                  (item) => item.index === virtualRow.index
                );
                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    {item && (
                      <RenderItem item={item} index={virtualRow.index} />
                    )}
                    {loadingInfo === "before" &&
                      virtualRow.index === items[0].index && (
                        <p className="text-center text-ttertiary my-2 text-sm">
                          fetching more data...
                        </p>
                      )}
                    {loadingInfo === "after" &&
                      virtualRow.index === items[items.length - 1].index && (
                        <p className="text-center text-ttertiary my-2 text-sm">
                          fetching more data...
                        </p>
                      )}
                    {!loadingInfo &&
                      end === count - 1 &&
                      virtualRow.index === items[items.length - 1].index && (
                        <p className="text-center text-ttertiary my-2 text-sm">
                          already loaded all data
                        </p>
                      )}
                  </div>
                );
              })
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default BothSideScroll;
