import { NoteContentType } from "@/types/notes";
import { Virtualizer } from "@tanstack/react-virtual";
import { SingleCommands } from "@tiptap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  MouseEvent,
  MutableRefObject,
  memo,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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
  showChapters: boolean;
  toggleChaptersPanel: (event: MouseEvent) => void;
}

const Content = memo(
  ({ virtualizerRef, showChapters, toggleChaptersPanel }: MainContentProps) => {
    const [noteInfo, setNoteInfo] = useState<NoteInfoType>({
      id: 0,
      title: "first note title",
      itemLength: 100,
      itemIds: [],
      updated: "",
      created: "",
    });

    const [datas, setDatas] = useState<NoteContentType[]>([]);
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
      }
    }, [noteInfo]);

    const firstContentRef = useRef<SingleCommands>();

    const onTitleNext = () => {
      if (firstContentRef.current) {
        firstContentRef.current.focus();
        return true;
      }
    };

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
          RenderItem={({ data, index }) =>
            index === 0 ? (
              <ContentItem
                index={index}
                item={data}
                editorRef={firstContentRef}
                updateItem={(item, index) => {
                  setDatas((v) => {
                    v[index] = item;
                    return v;
                  });
                }}
              />
            ) : (
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
            )
          }
        />

        <ContentFooter />
      </div>
    );
  }
);

export default Content;
