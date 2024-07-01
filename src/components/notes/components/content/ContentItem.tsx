import { NoteContentType } from "@/types/notes";
import { SingleCommands } from "@tiptap/react";
import {
  MutableRefObject,
  memo,
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
    const [loaded, setLoaded] = useState(item.loaded);
    const [content, setContent] = useState(item.content);
    useEffect(() => {
      if (!loaded) {
        setTimeout(() => {
          startTransition(() => {
            updateItem(
              {
                ...item,
                loaded: true,
                content: "already loaded",
              },
              item.id
            );
            setLoaded(true);
            setContent("already loaded");
            console.log(item.id);
          });
        }, 2000);
      } else {
        console.log(item.id, "loaded");
      }
    }, []);

    return (
      <div
        className="
  "
      >
        {!loaded ? (
          <ContentLoader />
        ) : (
          <ContentEditor
            editorRef={editorRef}
            key={"fd" + index}
            index={index}
            content={"" + index}
          />
        )}
      </div>
    );
  }
);

export default ContentItem;
