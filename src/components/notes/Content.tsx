import { Accordion } from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { Virtualizer } from "@tanstack/react-virtual";
import { SingleCommands } from "@tiptap/react";
import {
  MutableRefObject,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useSearchParams } from "react-router-dom";
import Empty from "../ui/Empty";
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
  const { notes, currentNoteId, currentNoteItemInfo } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch();
  const noteInfo = useMemo(
    () => notes.find((item) => item.id === currentNoteId),
    [notes, currentNoteId]
  );

  let [searchParams, setSearchParams] = useSearchParams();

  const [expandedValue, setExpandedValue] = useState(
    Array.from({ length: 100 }).map((item, index) => `${index}`)
  );
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!noteInfo) {
      return;
    }
    if (!noteInfo.count) {
    } else {
      startTransition(() => {
        const noteItems = noteInfo.noteItemIds.map((id) => ({
          id: id,
          content: "",
          updated: "",
          created: "",
          type: "exist",
          loaded: false,
        }));
        dispatch({
          type: "note/setCurrentNoteItemInfo",
          payload: noteItems,
        });
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

  const updateItem = (item, index) => {};
  return (
    <div className="relative transition-all h-full w-full pl-4 pt-4 pb-4">
      {currentNoteId && currentNoteItemInfo?.length ? (
        <>
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
            data={currentNoteItemInfo}
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
                />
              ) : (
                <ContentItem index={index} item={item} />
              )
            }
          />
          <ContentFooter />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
});

export default Content;
