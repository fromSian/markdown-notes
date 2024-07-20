import { deleteNote, queryNoteNavigation } from "@/request/notes";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { format } from "date-fns";
import { Loader, NotebookPen } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import Item from "./item";

interface ListProps {
  date: DateRange | undefined;
  data: NoteNavigationType[];
  setData: Dispatch<SetStateAction<NoteNavigationType[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleAddNew: () => void;
}

const List = ({
  date,
  data,
  setData,
  loading,
  setLoading,
  handleAddNew,
}: ListProps) => {
  const { t } = useTranslation("note");
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);
  const previousRatioRef = useRef(0);
  const controllerRef = useRef<AbortController>();

  const { activeId, updateInfo, showExactTime } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  const lastId = useMemo(() => data[data.length - 1]?.id, [data]);
  const [hasNext, setHasNext] = useState(false);
  const fetchNext = useCallback(async () => {
    try {
      if (controllerRef.current) {
        return;
      }
      controllerRef.current = new AbortController();
      setLoading(true);

      const response = await queryNoteNavigation(
        { since_id: lastId },
        controllerRef.current.signal
      );
      if (response) {
        setData((prev) => [...prev, ...response.results]);
        setHasNext(response.hasNext);
        if (!response.hasNext) {
          setLoaded(true);
          targetRef.current &&
            observerRef.current?.unobserve(targetRef.current);
        }
        setLoading(false);
        controllerRef.current = undefined;
      }
    } catch (error) {}
  }, [lastId]);

  useEffect(() => {
    if (!scrollRef.current || !targetRef.current) {
      return;
    }

    if (!hasNext) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
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
    targetRef.current && observerRef.current?.observe(targetRef.current);
    return () => {
      targetRef.current && observerRef.current?.unobserve(targetRef.current);
    };
  }, [fetchNext, hasNext]);

  const fetchFirst = useCallback(async () => {
    try {
      targetRef.current && observerRef.current?.unobserve(targetRef.current);

      if (controllerRef.current) {
        controllerRef.current.abort();
        controllerRef.current = undefined;
      }
      previousRatioRef.current = 0;

      setLoaded(false);
      setData([]);
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
        setHasNext(response.hasNext);
        if (!response.hasNext) {
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
  }, [date]);

  useEffect(() => {
    fetchFirst();
  }, [fetchFirst]);

  const handleDelete = async (id: string | number | undefined) => {
    if (controllerRef.current) {
      return;
    }
    await deleteNote(id);
    dispatch({
      type: "note/setActive",
      payload: {
        info: undefined,
      },
    });
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
        <p className="text-xs italic divider w-full truncate mb-2">
          {format(date.from, "yyyy-MM-dd")}
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
                showExactTime={showExactTime}
              />
            ))
          : ""}
      </div>

      {!loading && !date && !data.length && (
        <div
          className={`flex flex-col items-center h-full w-full absolute text-ttertiary pt-32 gap-4 `}
        >
          <NotebookPen
            className="cursor-pointer hover:text-tprimary animate-bounce"
            onClick={handleAddNew}
            size={36}
          />
          <p className="italic text-center text-lg">{t("empty-description")}</p>
        </div>
      )}
      <div className="w-full flex justify-center my-2">
        {loading && <Loader className="animate-spin" />}
        {loaded && (data.length || date) ? (
          <p className="text-xs text-ttertiary truncate">
            {data.length} {t("item", { count: data.length })}
          </p>
        ) : (
          ""
        )}
      </div>
      {date?.to ? (
        <p className="text-xs italic divider w-full truncate">
          {format(date.to, "yyyy-MM-dd")}{" "}
        </p>
      ) : (
        ""
      )}
      <div ref={targetRef} className="w-full"></div>
    </div>
  );
};

export default List;
