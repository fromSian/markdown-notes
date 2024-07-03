import { Accordion } from "@/components/ui/accordion";
import { NoteContentType } from "@/types/notes";
import { Virtualizer } from "@tanstack/react-virtual";
import { SingleCommands } from "@tiptap/react";
import {
  MutableRefObject,
  memo,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useSearchParams } from "react-router-dom";
import VirtualScroll from "../ui/VirtualScroll";
import ContentFooter from "./components/content/ContentFooter";
import ContentItem from "./components/content/ContentItem";
import ContentTitle from "./components/content/ContentTitle";

type NoteInfoType = {
  id: number;
  title: string;
  itemLength: number;
  itemIds: number[];
  updated: string;
  created: string;
};
type NoteItemInfoType = {
  id: number;
  content: string;
  updated: string;
  created: string;
  type: "exist" | "new";
  loaded: boolean;
};

interface MainContentProps {
  virtualizerRef: MutableRefObject<Virtualizer<HTMLDivElement, Element> | null>;
  chapterIndex: number;
}

const Content = memo(({ virtualizerRef, chapterIndex }: MainContentProps) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [noteInfo, setNoteInfo] = useState<NoteInfoType>({
    id: 0,
    title: "first note title",
    itemLength: 100,
    itemIds: [],
    updated: "",
    created: "",
  });

  const [datas, setDatas] = useState<NoteContentType[]>([]);

  const [expandedValue, setExpandedValue] = useState(
    Array.from({ length: 100 }).map((item, index) => `${index}`)
  );
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!noteInfo.itemLength) {
      startTransition(() => {
        setDatas([
          {
            id: 0,
            content: "",
            updated: "",
            created: "",
            type: "new",
            loaded: true,
          },
        ]);
      });
    } else {
      startTransition(() => {
        setDatas((v) =>
          Array.from({ length: noteInfo.itemLength }).map((_, i) => ({
            id: i,
            content: "",
            updated: "",
            created: "",
            type: "exist",
            loaded: false,
          }))
        );
      });
      setTimeout(() => {
        virtualizerRef.current?.scrollToIndex(chapterIndex, {
          align: "start",
        });
      }, 1000);
    }
  }, [noteInfo]);

  useEffect(() => {
    console.log(chapterIndex);
    virtualizerRef.current?.scrollToIndex(chapterIndex, {
      align: "start",
    });
  }, [chapterIndex]);

  const firstContentRef = useRef<SingleCommands>();

  const onTitleNext = () => {
    if (firstContentRef.current) {
      firstContentRef.current.focus("end");
      return true;
    }
  };

  const updateItem = (item, index) => {
    console.log(321);
    setDatas((v) => {
      v[index] = item;
      return v;
    });
  };
  return (
    <div className="relative transition-all h-full w-full pl-4 pt-4 pb-4">
      <div className="">
        <ContentTitle
          created={noteInfo.created}
          updated={noteInfo.updated}
          count={noteInfo.itemLength}
          initialValue={noteInfo.title}
          onNext={onTitleNext}
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
        ParentItem={({ children }) => (
          <Accordion type="multiple" defaultValue={expandedValue}>
            {children}
          </Accordion>
        )}
        RenderItem={({ item, index }) =>
          index === 0 ? (
            <ContentItem
              index={index}
              item={item}
              editorRef={firstContentRef}
              updateItem={updateItem}
            />
          ) : (
            <ContentItem index={index} item={item} updateItem={updateItem} />
          )
        }
      />
      <ContentFooter />
    </div>
  );
});

export default Content;
