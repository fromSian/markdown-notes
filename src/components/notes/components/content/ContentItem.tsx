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
                content: "already loaded" + index,
                updated: "123213",
                created: "123213",
              },
              item.id
            );
            setLoaded(true);
            setContent("already loaded" + index);
          });
        }, 1000);
      } else {
      }
    }, []);

    return (
      <>
        {!loaded ? (
          <ContentLoader />
        ) : (
          <ContentEditor
            editorRef={editorRef}
            key={"fd" + index}
            index={index}
            id={item.id}
            content={content}
            updated={item.updated}
            created={item.created}
            onSave={() => {}}
          />
        )}
      </>
    );
  }
);

export default ContentItem;
