import { NoteContentType } from "@/types/notes";
import { Virtualizer } from "@tanstack/react-virtual";
import { SingleCommands } from "@tiptap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  MouseEvent,
  MutableRefObject,
  memo,
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
}

const Content = memo(
  ({ virtualizerRef, showChapters, toggleChaptersPanel }: MainContentProps) => {
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

    const [isPending, startTransition] = useTransition();
    const firstContentRef = useRef<SingleCommands>();

    const onTitleNext = () => {
      if (firstContentRef.current) {
        const isFocus = firstContentRef.current.focus("end");
        return isFocus;
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
          <ContentTitle onNext={onTitleNext} initialValue="title" />
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
