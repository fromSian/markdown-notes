import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { v4 as uuid4 } from "uuid";
import Item from "./item";

interface ListProps {
  date: DateRange | undefined;
  data: NoteNavigationType[];
  setData: Dispatch<SetStateAction<NoteNavigationType[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const List = ({ date, data, setData, loading, setLoading }: ListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);
  const previousRatioRef = useRef(0);
  const queryRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const pageRef = useRef(1);

  const { activeId, activeInfo } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);
  const fetchNext = () => {
    if (queryRef.current) {
      return;
    }
    setLoading(true);
    queryRef.current = setTimeout(() => {
      const page = pageRef.current;
      setData((v) => {
        return [
          ...v,
          ...Array.from({ length: 15 }, (_, i) => ({
            id: uuid4(),
            title: "title",
            summary: "summary",
            created: "created",
            updated: "updated",
          })),
        ];
      });
      pageRef.current = page + 1;
      //   response.links.next is null
      if (page > 0) {
        setLoaded(true);
        targetRef.current && observerRef.current?.unobserve(targetRef.current);
      }
      queryRef.current = undefined;
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (!scrollRef.current || !targetRef.current) {
      return;
    }

    let options = {
      root: scrollRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    let callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.intersectionRatio > previousRatioRef.current) {
          fetchNext();
        }
        previousRatioRef.current = entry.intersectionRatio;
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);

    return () => {
      targetRef.current && observerRef.current?.unobserve(targetRef.current);
    };
  }, []);

  const fetchFirst = () => {
    setLoading(true);
    setTimeout(() => {
      const _data = Array.from({ length: 15 }, (_, i) => ({
        id: uuid4(),
        title: "title",
        summary: "summary",
        created: "created",
        updated: "updated",
        count: 0,
      }));
      setData(_data);
      if (true) {
        targetRef.current && observerRef.current?.observe(targetRef.current);
      } else {
        setLoaded(true);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    targetRef.current && observerRef.current?.unobserve(targetRef.current);
    if (queryRef.current) {
      clearTimeout(queryRef.current);
      queryRef.current = undefined;
    }
    // dispatch({
    //   type: "note/setActive",
    //   payload: {
    //     info: undefined,
    //   },
    // });
    setLoaded(false);
    setData([]);
    fetchFirst();
    pageRef.current = 1;
  }, [date]);

  const handleDelete = (id: string | number | undefined) => {
    if (queryRef.current) {
      clearTimeout(queryRef.current);
      queryRef.current = undefined;
    }
    setData((v) => v.filter((v) => v.id != id));
  };

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-auto pb-4"
      style={{
        height: "calc(100% - 36px)",
      }}
    >
      {date?.from ? (
        <p className="text-xs italic divider w-full truncate">
          {format(date.from, "LLL dd, y")}
        </p>
      ) : (
        ""
      )}

      <div className="flex flex-col">
        {data &&
          data.map((item, index) => (
            <Item
              key={item.id}
              item={activeId === item.id ? activeInfo : item}
              index={index}
              loading={loading}
              active={activeId === item.id}
              handleDelete={handleDelete}
            />
          ))}
      </div>

      <div className="w-full flex justify-center my-4">
        {loading && <Loader className="animate-spin" />}
        {loaded && <p className="text-xs text-ttertiary">already loaded all</p>}
      </div>
      {date?.to ? (
        <p className="text-xs italic divider w-full truncate">
          {format(date.to, "LLL dd, y")}
        </p>
      ) : (
        ""
      )}
      <div ref={targetRef} className="w-full"></div>
    </div>
  );
};

export default List;
