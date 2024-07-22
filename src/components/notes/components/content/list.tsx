import { getErrorMessage } from "@/request/error";
import {
  addNoteContent,
  deleteNoteContent,
  queryNoteContents,
  queryNoteInfo,
  updateNoteContent,
  updateTitle,
} from "@/request/notes";
import { useAppDispatch } from "@/states/hooks";
import {
  NoteContentItemType,
  NoteNavigationType,
  SortInfo,
} from "@/types/notes";
import { Loader } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Item, { ItemRef } from "./item/index";
import NewEditor from "./new-editor";
import Subline from "./subline";
import Title from "./title";
interface ListProps {
  contentRefs: MutableRefObject<ItemRef[]>;
  activeId: string | number;
  info: NoteNavigationType;
  adding: boolean;
  setAdding: Dispatch<SetStateAction<boolean>>;
  sortInfo: SortInfo;
  defaultExpanded: boolean;
  showExactTime: boolean;
}

const List = ({
  contentRefs,
  activeId,
  info,
  adding,
  setAdding,
  sortInfo,
  defaultExpanded,
  showExactTime,
}: ListProps) => {
  const { t } = useTranslation(["note", "message"]);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);
  const previousRatioRef = useRef(0);

  const controllerRef = useRef<AbortController>();

  const newRef = useRef(null);
  const [data, setData] = useState<NoteContentItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const lastId = useMemo(() => data[data.length - 1]?.id, [data]);
  const [hasNext, setHasNext] = useState(false);

  const [titleLoading, setTitleLoading] = useState(false);

  const fetchNext = useCallback(async () => {
    try {
      if (controllerRef.current) {
        return;
      }
      controllerRef.current = new AbortController();
      setLoading(true);

      const response = await queryNoteContents(
        {
          id: activeId,
          since_id: lastId,
          order: sortInfo,
        },
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
  }, [activeId, lastId, sortInfo]);

  useEffect(() => {
    if (!scrollRef.current || !targetRef.current) {
      return;
    }
    if (!hasNext) {
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
    targetRef.current && observerRef.current?.observe(targetRef.current);
    return () => {
      targetRef.current && observerRef.current?.unobserve(targetRef.current);
    };
  }, [fetchNext, hasNext]);

  const fetchFirst = useCallback(async () => {
    try {
      if (!activeId) return;
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
      const response = await queryNoteContents(
        {
          id: activeId,
          order: sortInfo,
        },
        controllerRef.current.signal
      );
      if (response) {
        setData((v) => response.results);
        setHasNext(response.hasNext);
        if (!response.hasNext) {
          if (!response.count) {
            setAdding(true);
          }
          setLoaded(true);
        }
      }
      controllerRef.current = undefined;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [activeId, sortInfo]);

  useEffect(() => {
    fetchFirst();
  }, [fetchFirst]);

  const handleTitleSave = async (id: string | number, text: string) => {
    try {
      setTitleLoading(true);
      const response = await updateTitle(id, text);
      dispatch({
        type: "note/setUpdateInfo",
        payload: response,
      });
      toast.success(t("save title successfully", { ns: "message" }));
      setTitleLoading(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
      setTitleLoading(false);
    }
  };

  const onNewSubmit = useCallback(
    async (content: string, summary: string) => {
      const response = await addNoteContent(activeId, content, summary);
      const noteinfo = await queryNoteInfo(activeId);
      dispatch({ type: "note/setUpdateInfo", payload: noteinfo });
      setData((v) => {
        return sortInfo.startsWith("-") ? [response, ...v] : [...v, response];
      });
    },
    [activeId, sortInfo]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      if (controllerRef.current) {
        return;
      }
      await deleteNoteContent(id);
      setData((v) => v.filter((v) => v.id != id));

      const noteinfo = await queryNoteInfo(activeId);
      dispatch({ type: "note/setUpdateInfo", payload: noteinfo });
    },
    [activeId]
  );

  const handleSave = async (
    id: string | number,
    content: string,
    summary: string
  ) => {
    const response = await updateNoteContent(id, content, summary);

    setData((v) => v.map((item) => (item.id === id ? response : item)));

    const { updated } = response;
    dispatch({
      type: "note/setUpdateInfo",
      payload: { updated },
    });
  };

  return (
    <div
      className="overflow-auto pb-4 pr-2 sm:pr-4"
      style={{
        height: "calc(100% - 36px)",
      }}
      ref={scrollRef}
    >
      <Title
        id={activeId}
        initialValue={info.title}
        handleSave={handleTitleSave}
      />
      <Subline
        updated={info.updated}
        created={info.created}
        count={info.count}
        loading={titleLoading}
      />
      {adding && (
        <NewEditor
          ref={newRef}
          setAdding={setAdding}
          onNewSubmit={onNewSubmit}
        />
      )}
      <div className="flex flex-col gap-6">
        {data &&
          data.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              sortField={sortInfo.replace("-", "") as "updated" | "created"}
              ref={(element) =>
                (contentRefs.current[index] = element as ItemRef)
              }
              handleDelete={handleDelete}
              handleSave={handleSave}
              defaultExpanded={defaultExpanded}
              showExactTime={showExactTime}
            />
          ))}
      </div>

      <div className="w-full flex justify-center my-4">
        {loading && <Loader className="animate-spin" />}
        {loaded && (
          <p className="text-xs text-ttertiary">
            {info.count} {t("item", { count: info.count })}
          </p>
        )}
      </div>

      <div ref={targetRef} className="w-full"></div>
    </div>
  );
};

export default List;
