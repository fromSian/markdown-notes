import BothSideScroll from "@/components/ui/BothSideScroll";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { query, queryAfter, queryBefore } from "@/states/note.slice";
import { Virtualizer } from "@tanstack/react-virtual";
import { memo, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavigationRenderItem from "./components/NavigationRenderItem";

/**
 * searchParams initial date
 * base on id to get first new datas, and scroll to the middle one.
 *
 *
 * and no scroll to index
 *
 *
 *
 */

const NavigationPanel = memo(() => {
  const { notes, currentNoteId, count, start, end } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  // searchParams including initialDate
  const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element>>();
  const [loadingInfo, setLoadingInfo] = useState<
    "first" | "after" | "before" | undefined
  >();
  const [nowFirstDataIndex, setNowFirstDataIndex] = useState(-1);
  const [nowLastDataIndex, setNowLastDataIndex] = useState(-1);

  const fetchData = async () => {
    try {
      setLoadingInfo("first");
      const initialDate = searchParams.get("date") || null;

      setTimeout(async () => {
        const response = await dispatch(query()).unwrap();
        setNowFirstDataIndex(response.start);
        setNowLastDataIndex(response.end);
        setLoadingInfo(undefined);
        setTimeout(() => {
          virtualizerRef.current?.scrollToIndex(response.middle);
        }, 0);
      }, 1000);
    } catch (error) {}
  };

  const fetchBefore = async (base: number, defaultLength = 10) => {
    try {
      if (base < 1) {
        return;
      }
      setLoadingInfo("before");
      setTimeout(async () => {
        let length = defaultLength;
        if (base < length) {
          length = base;
        }
        const response = await dispatch(queryBefore({ base, length })).unwrap();

        setNowFirstDataIndex(response.start);
        setLoadingInfo(undefined);
      }, 1000);
    } catch (error) {}
  };

  const fetchAfter = async (base: number, defaultLength = 10) => {
    try {
      if (base > count - length) {
        return;
      }
      setLoadingInfo("after");
      setTimeout(async () => {
        let length = defaultLength;
        if (base > count - length) {
          length = count - base - 1;
        }

        const response = await dispatch(queryAfter({ base, length })).unwrap();
        setNowLastDataIndex(response.end);
        setLoadingInfo(undefined);
      }, 1000);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (count) {
      setNowLastDataIndex(end);
    }
  }, [count, end]);

  return (
    <div className={cn("border-r-2 transition-all h-full w-full py-4")}>
      <BothSideScroll
        ref={virtualizerRef}
        data={notes}
        count={count}
        loadingInfo={loadingInfo}
        start={start}
        end={end}
        fetchBefore={fetchBefore}
        fetchAfter={fetchAfter}
        setNowFirstDataIndex={setNowFirstDataIndex}
        setNowLastDataIndex={setNowLastDataIndex}
        RenderItem={({ item, index }) => {
          return (
            <NavigationRenderItem
              item={item}
              index={index}
              active={currentNoteId === item.id}
              disableDelete={Boolean(loadingInfo)}
            />
          );
        }}
      />
    </div>
  );
});

export default NavigationPanel;
