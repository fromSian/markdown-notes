import { useAppSelector } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { Loader } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuid4 } from "uuid";
import Item from "./item/index";
import NewEditor from "./NewEditor";
import Subline from "./subline";
import Title from "./title";
interface ListProps {
  scrollRef: MutableRefObject<HTMLDivElement>;
  navigationId: string | number | undefined;
  data: NoteNavigationType[];
  setData: Dispatch<SetStateAction<NoteNavigationType[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const List = ({
  navigationId,
  data,
  setData,
  loading,
  setLoading,
}: ListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);
  const previousRatioRef = useRef(0);
  const queryRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const pageRef = useRef(1);
  const newRef = useRef(null);
  const contentRefs = useRef([]);
  const [desc, setDesc] = useState(true);

  const { noteInfo, activeNoteId, noteItems } = useAppSelector(
    (state) => state.noteItem
  );
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
          title: "title",
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

    if (!navigationId) {
      return;
    }
    fetchFirst();
    pageRef.current = 1;
  }, [navigationId, desc]);

  const onExistAddNew = () => {
    // setIsAddingNew(false);
  };
  return (
    <div
      className="overflow-auto pb-4"
      style={{
        height: "calc(100% - 36px)",
      }}
      ref={scrollRef}
    >
      <Title initialValue={noteInfo?.title} />
      <Subline
        updated="update"
        created="created"
        count={12}
        desc={desc}
        setDesc={setDesc}
      />
      {true && <NewEditor ref={newRef} onExistAddNew={onExistAddNew} />}
      <div className="flex flex-col gap-6">
        {data &&
          data.map((item, index) => (
            <Item key={item.id} item={item} index={index} />
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
