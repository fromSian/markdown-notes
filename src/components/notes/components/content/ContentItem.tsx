import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NoteContentType } from "@/types/notes";
import { SingleCommands } from "@tiptap/react";
import {
  MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import ContentEditor from "./ContentEditor";
import ContentLoader from "./ContentLoader";
interface ContentItemProps {
  index: number;
  item: NoteContentType;
  updateItem: (item: NoteContentType, index: number) => void;
  editorRef?: MutableRefObject<SingleCommands | undefined>;
}

const ContentItem = memo(
  ({ editorRef, index, item, updateItem }: ContentItemProps) => {
    const [isPending, startTransition] = useTransition();
    const { loaded, ...rest } = item;
    const [done, setDone] = useState(loaded);
    const [info, setInfo] = useState(rest);
    useEffect(() => {
      if (!done) {
        setTimeout(() => {
          startTransition(() => {
            setInfo((v) => ({
              ...v,
              content: "content",
              summmary: "summary",
              created: "created",
              updated: "updated",
            }));
            setDone(true);
          });
          updateItem(
            {
              ...rest,
              content: "content",
              summmary: "summary",
              created: "created",
              updated: "updated",
            },
            index
          );
        }, 1000);
      } else {
      }
    }, []);

    const onSave = useCallback(() => {
      // updateChapterItem(index, {
      //   status: "saving",
      // });
      // setTimeout(() => {
      //   updateChapterItem(index, {
      //     status: "saved",
      //   });
      // }, 3000);
    }, [index]);

    return (
      <>
        {!done ? (
          <ContentLoader />
        ) : (
          <>
            <AccordionItem
              value={`${index}`}
              onChange={(e) => {
                console.log(e);
              }}
            >
              <AccordionTrigger
                onChange={(e) => {
                  console.log(e);
                }}
                className="group w-full text-tsecondary text-sm"
              >
                <span className="flex gap-2 w-[90%] italic">
                  <span>{index + 1}.</span>

                  <span className="hidden group-data-[state=closed]:block truncate">
                    summary is that the short of this what kind of this is that
                    please try to sllep summary is that the short of this what
                    kind of this is that please try to sllep summary is that the
                    short of this what kind of this is that please try to sllep
                    summary is that the short of this what kind of this is that
                    please try to sllep
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="data-[state=open]:bg-white">
                <ContentEditor
                  editorRef={editorRef}
                  key={"fd" + index}
                  index={index}
                  id={item.id}
                  content={info.content}
                  onSave={onSave}
                />
              </AccordionContent>
            </AccordionItem>
            <div className="flex gap-2 text-xs text-ttertiary mt-2">
              <span>{info.created}</span>
              <span>{info.updated}</span>
            </div>
          </>
        )}
      </>
    );
  }
);

export default ContentItem;
