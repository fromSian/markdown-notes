import Empty from "@/components/ui/Empty";
import { deleteNote, queryNoteNavigation } from "@/request/notes";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
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
  const pageRef = useRef(1);
  const controllerRef = useRef<AbortController>();

  const { activeId, activeInfo, updateInfo } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);
  const fetchNext = async () => {
    try {
      if (controllerRef.current) {
        return;
      }
      controllerRef.current = new AbortController();
      setLoading(true);

      const page = pageRef.current;
      console.log(page);
      const response = await queryNoteNavigation(
        { page: page + 1 },
        controllerRef.current.signal
      );
      if (response) {
        setData((prev) => [...prev, ...response.results]);
        console.log(response.links.next);
        if (!response.links.next) {
          setLoaded(true);
          targetRef.current &&
            observerRef.current?.unobserve(targetRef.current);
        } else {
          pageRef.current = page + 1;
        }
        setLoading(false);
        controllerRef.current = undefined;
      }
    } catch (error) {}
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
          console.log("fetch");
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

  const fetchFirst = async (date: DateRange | undefined) => {
    try {
      controllerRef.current = new AbortController();
      setLoading(true);
      const response = await queryNoteNavigation(
        {
          start: date?.from ? format(date.from, "yyyy-MM-dd") : "",
          end: date?.to ? format(date.to, "yyyy-MM-dd") : "",
        },
        controllerRef.current.signal
      );
      if (response) {
        setData(response.results);
        if (response.links.next) {
          targetRef.current && observerRef.current?.observe(targetRef.current);
        } else {
          setLoaded(true);
        }
        if (response.results.length) {
          dispatch({
            type: "note/setActive",
            payload: {
              info: response.results[0],
            },
          });
        }
      }
      controllerRef.current = undefined;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    targetRef.current && observerRef.current?.unobserve(targetRef.current);

    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = undefined;
    }
    setLoaded(false);
    setData([]);
    fetchFirst(date);
    pageRef.current = 1;
  }, [date]);

  const handleDelete = async (id: string | number | undefined) => {
    if (controllerRef.current) {
      return;
    }
    await deleteNote(id);
    setData((v) => v.filter((v) => v.id != id));
  };

  useEffect(() => {
    if (!updateInfo) {
      return;
    }
    setData((v) => [updateInfo, ...v.filter((v) => v.id !== updateInfo.id)]);
  }, [updateInfo]);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-auto pb-4 relative"
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
        {data?.length
          ? data.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                loading={loading}
                active={activeId === item.id}
                handleDelete={handleDelete}
              />
            ))
          : ""}
      </div>
      {!data.length ? <Empty /> : ""}

      <div className="w-full flex justify-center my-4">
        {loading && <Loader className="animate-spin" />}
        {loaded && (
          <p className="text-xs text-ttertiary truncate">{data.length} items</p>
        )}
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
