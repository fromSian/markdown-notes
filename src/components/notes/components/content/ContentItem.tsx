import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch } from "@/states/hooks";
import { queryNoteItemDetail } from "@/states/note.slice";
import { NoteContentType } from "@/types/notes";
import { SingleCommands } from "@tiptap/react";
import {
  MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import ContentEditor from "./ContentEditor";
import ContentLoader from "./ContentLoader";
interface ContentItemProps {
  index: number;
  item: NoteContentType;
  editorRef?: MutableRefObject<SingleCommands | undefined>;
}

const ContentItem = memo(({ editorRef, index, item }: ContentItemProps) => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const timeRef = useRef();
  const [loaded, setLoaded] = useState(item.loaded);
  const [info, setInfo] = useState(item);

  useEffect(() => {
    if (!loaded) {
      timeRef.current = setTimeout(async () => {
        const response = await dispatch(
          queryNoteItemDetail({
            id: item.id,
          })
        ).unwrap();
        setInfo(response);
      }, 100);
    }
    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
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
      {!item.loaded ? (
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
                id={info.id}
                content={item.content}
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
});

export default ContentItem;
