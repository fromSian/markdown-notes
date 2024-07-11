import { getErrorMessage } from "@/request/error";
import {
  addNoteContent,
  deleteNoteContent,
  queryNoteContents,
  updateNoteContent,
  updateTitle,
} from "@/request/notes";
import { useAppDispatch } from "@/states/hooks";
import { NoteContentItemType, NoteNavigationType } from "@/types/notes";
import { Loader } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import Item from "./item/index";
import NewEditor from "./NewEditor";
import Subline from "./subline";
import Title from "./title";
interface ListProps {
  contentRefs: MutableRefObject<HTMLDivElement>;
  activeId: string | number;
  info: NoteNavigationType;
  adding: boolean;
  setAdding: Dispatch<SetStateAction<boolean>>;
  sortInfo: any;
}

const List = ({
  contentRefs,
  activeId,
  info,
  adding,
  setAdding,
  sortInfo,
}: ListProps) => {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);
  const previousRatioRef = useRef(0);

  const controllerRef = useRef<AbortController>();

  const pageRef = useRef(1);
  const newRef = useRef(null);
  const [data, setData] = useState<NoteContentItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchNext = useCallback(async () => {
    try {
      if (controllerRef.current) {
        return;
      }
      controllerRef.current = new AbortController();
      setLoading(true);

      const page = pageRef.current;
      const response = await queryNoteContents(
        { id: activeId, page: page + 1 },
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
  }, [activeId]);

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
  }, [fetchNext]);

  const fetchFirst = async (id: string | number, order: string) => {
    try {
      controllerRef.current = new AbortController();
      setLoading(true);
      const response = await queryNoteContents(
        {
          id,
          order,
        },
        controllerRef.current.signal
      );
      if (response) {
        setData(response.results);
        if (response.links.next) {
          targetRef.current && observerRef.current?.observe(targetRef.current);
        } else {
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
  };

  useEffect(() => {
    targetRef.current && observerRef.current?.unobserve(targetRef.current);

    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = undefined;
    }
    previousRatioRef.current = 0;

    setLoaded(false);

    setData([]);

    if (!activeId) {
      return;
    }
    fetchFirst(
      activeId,
      `${sortInfo.order === "desc" ? "-" : ""}${sortInfo.field}`
    );
    pageRef.current = 1;
  }, [activeId, sortInfo]);

  const handleTitleSave = async (id: string | number, text: string) => {
    try {
      const response = await updateTitle(id, text);
      console.log(response);
      dispatch({
        type: "note/setUpdateInfo",
        payload: response,
      });
      toast.success("update title successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };

  const onNewSubmit = async (content: string, summary: string) => {
    const response = await addNoteContent(activeId, content, summary);
    setData((v) => [response, ...v]);
  };

  const handleDelete = async (id: string | number) => {
    if (controllerRef.current) {
      return;
    }
    await deleteNoteContent(id);
    setData((v) => v.filter((v) => v.id != id));
  };

  const handleSave = async (
    id: string | number,
    content: string,
    summary: string
  ) => {
    const response = await updateNoteContent(id, content, summary);

    setData((v) => v.map((item) => (item.id === id ? response : item)));
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
              ref={(element) => (contentRefs.current[index] = element)}
              handleDelete={handleDelete}
              handleSave={handleSave}
            />
          ))}
      </div>

      <div className="w-full flex justify-center my-4">
        {loading && <Loader className="animate-spin" />}
        {loaded && <p className="text-xs text-ttertiary">loaded all</p>}
      </div>

      <div ref={targetRef} className="w-full"></div>
    </div>
  );
};

export default List;
