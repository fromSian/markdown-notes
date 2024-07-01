import { NoteContentType } from "@/types/notes";
import { Virtualizer } from "@tanstack/react-virtual";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  MouseEvent,
  MutableRefObject,
  memo,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import VirtualScroll from "../ui/VirtualScroll";
import ContentFooter from "./components/content/ContentFooter";
import ContentItem from "./components/content/ContentItem";
import ContentTitle from "./components/content/ContentTitle";
import NoteDate from "./components/content/NoteDate";

interface MainContentProps {
  virtualizerRef: MutableRefObject<Virtualizer<HTMLDivElement, Element> | null>;
  showChapters: boolean;
  toggleChaptersPanel: (event: MouseEvent) => void;
  activeNavigationIndex: number;
  activeChapterIndex: number;
  setActiveChapterIndex: (index: number) => void;
  setActiveNavigationIndex: (index: number) => void;
}

const Content = memo(
  ({
    virtualizerRef,
    showChapters,
    toggleChaptersPanel,
    activeNavigationIndex,
    activeChapterIndex,
    setActiveChapterIndex,
    setActiveNavigationIndex,
  }: MainContentProps) => {
    const [newing, setNewing] = useState(false);
    const [focus, setFocus] = useState(false);

    const [fetching, setFetching] = useState(false);

    const [datas, setDatas] = useState<NoteContentType[]>(
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        content: "",
        updated: "",
        created: "",
        type: "exist",
        loaded: false,
      }))
    );
    const [hasNextPage, setHasNextPage] = useState(true);
    const pageRef = useRef(0);
    const fetchData = useCallback(() => {
      try {
        setFetching(true);
        setTimeout(() => {
          pageRef.current = pageRef.current + 1;

          if (pageRef.current === 3) {
            setHasNextPage(false);
          }
          const a = Array.from({ length: 4 }).map(
            (_, i) =>
              ({
                id: 1,
                content: "",
                updated: "",
                created: "",
                type: "exist",
              } as NoteContentType)
          );
          setDatas((v) => [...v, ...a]);

          setFetching(false);
        }, 1000);
      } catch (error) {}
    }, []);

    // useEffect(() => {
    //   fetchData();
    // }, []);

    const [isPending, startTransition] = useTransition();
    /**
     *
     * add new 时 加一条到data 不要放到newing里
     */

    const onNewSave = useCallback((text: string) => {
      if (!text) return;
      // setNewing(false);
      setFetching(true);
      setTimeout(() => {
        startTransition(() => {
          setFetching(false);
        });
      }, 1000);
    }, []);

    const onEditSave = useCallback((text: string) => {
      // if (!text) {
      // not do this
      //   console.log("are you sure you want to delete this");
      // }
    }, []);

    const handleAddNew = useCallback(() => {
      startTransition(() => {
        setDatas((v) => [
          ...v,
          {
            id: v.length,
            content: "",
            created: "",
            updated: "",
            type: "new",
          },
        ]);
      });
    }, []);

    const onNext = useCallback(() => {
      setFocus(true);
      setTimeout(() => {
        setFocus(false);
      }, 200);
    }, []);

    return (
      <div className="relative transition-all h-full w-full pl-4 pt-4 pb-4">
        <div
          onClick={toggleChaptersPanel}
          className="cursor-pointer absolute right-0 top-0"
        >
          {showChapters ? (
            <ArrowRight color="gray" />
          ) : (
            <ArrowLeft color="gray" />
          )}
        </div>
        <div className="">
          <ContentTitle onNext={onNext} initialValue="title" />
          <NoteDate
            created="2012-2-3"
            updated="2014-2-3"
            extra={<span className="ml-2">30 total</span>}
          />
        </div>
        <VirtualScroll
          ref={virtualizerRef}
          data={datas}
          style={{
            height: "calc(100% - 110px)",
          }}
          className="pr-4"
          estimateSize={60}
          RenderItem={({ data, index }) => (
            <ContentItem
              index={index}
              item={data}
              updateItem={(item, index) => {
                setDatas((v) => {
                  v[index] = item;
                  return v;
                });
              }}
            />
          )}
        />

        {/* <InfiniteVirtual
          ref={virtualizerRef}
          estimateSize={60}
          fetching={fetching}
          hasNextPage={hasNextPage}
          data={data}
          fetchData={fetchData}
          style={{
            height: "calc(100% - 110px)",
          }}
          RenderItem={({ data, index }) => (
            <ContentEditor
              key={"fd" + index}
              index={index}
              autoFocus={index == 0 && focus}
              content={"" + index}
              onSave={onEditSave}
            />
          )}
        /> */}
        <ContentFooter />
      </div>
    );
  }
);

export default Content;
