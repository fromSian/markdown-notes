import { getErrorMessage } from "@/request/error";
import { updateTitle } from "@/request/notes";
import { useAppDispatch } from "@/states/hooks";
import { NoteContentItemType, NoteNavigationType } from "@/types/notes";
import { Loader } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { v4 as uuid4 } from "uuid";
import Item from "./item/index";
import NewEditor from "./NewEditor";
import Subline from "./subline";
import Title from "./title";
interface ListProps {
  contentRefs: MutableRefObject<HTMLDivElement>;
  activeId: string | number | undefined;
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
  const queryRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  const pageRef = useRef(1);
  const newRef = useRef(null);
  const [data, setData] = useState<NoteContentItemType[]>([]);
  const [loading, setLoading] = useState(false);
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
            content: "content",
            summary: "summary",
            created: "created",
            updated: "updated",
          })),
        ];
      });
      pageRef.current = page + 1;
      //   response.links.next is null
      if (page > 1) {
        setLoaded(true);
        targetRef.current && observerRef.current?.unobserve(targetRef.current);
      }
      previousRatioRef.current = 0;
      queryRef.current = undefined;
      setLoading(false);
    }, 1000);
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
      setData(
        Array.from({ length: 15 }, (_, i) => ({
          id: uuid4(),
          content: "content",
          summary: "summary",
          created: "created",
          updated: "updated",
        }))
      );
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
    previousRatioRef.current = 0;

    setLoaded(false);

    setData([]);

    if (!activeId) {
      return;
    }
    fetchFirst();
    pageRef.current = 1;
  }, [activeId, sortInfo]);

  const handleSave = async (id: string | number, text: string) => {
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

  return (
    <div
      className="overflow-auto pb-4 pr-2 sm:pr-4"
      style={{
        height: "calc(100% - 36px)",
      }}
      ref={scrollRef}
    >
      <Title id={activeId} initialValue={info.title} handleSave={handleSave} />
      <Subline
        updated={info.updated}
        created={info.created}
        count={info.count}
      />
      {adding && <NewEditor ref={newRef} setAdding={setAdding} />}
      <div className="flex flex-col gap-6">
        {data &&
          data.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              ref={(element) => (contentRefs.current[index] = element)}
            />
          ))}
      </div>

      <div className="w-full flex justify-center my-4">
        {loading && <Loader className="animate-spin" />}
        {loaded && (
          <p className="text-xs italic text-ttertiary">already loaded all</p>
        )}
      </div>

      <div ref={targetRef} className="w-full"></div>
    </div>
  );
};

export default List;
