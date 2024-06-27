import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { NoteContentType } from "@/types/notes";
import { useCallback, useMemo, useState, useTransition } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ContentEditor from "./components/ContentEditor";
import ContentTitle from "./components/ContentTitle";
const MainContent = () => {
  const { showChapters } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [newing, setNewing] = useState(false);
  const [focus, setFocus] = useState(false);

  const [fetching, setFetching] = useState(false);

  const [data, setData] = useState<NoteContentType[]>([
    {
      id: 1,
      content: "content1",
      created: "",
      updated: "",
    },
  ]);

  const titleNextFocus = useMemo(
    () => (data.length ? "list" : "new"),
    [[data]]
  );
  const [isPending, startTransition] = useTransition();

  const onNewSave = useCallback((text: string) => {
    console.log(text);
    if (!text) return;
    setNewing(false);
    setFetching(true);
    setTimeout(() => {
      startTransition(() => {
        setData((v) => [
          ...v,
          {
            id: v.length + 1,
            content: text,
            created: "",
            updated: "",
          },
        ]);
        setFetching(false);
      });
    }, 1000);
  }, []);

  const onEditSave = useCallback((text: string) => {
    // setData((v) => [...v, 1]);
    // if (!text) {
    // not do this
    //   console.log("are you sure you want to delete this");
    // }
  }, []);

  const onNext = useCallback(() => {
    setFocus(true);
    console.log(titleNextFocus);
  }, [titleNextFocus]);

  return (
    <ScrollArea className="transition-all h-full w-full p-4">
      <p className="text-ttertiary text-center">create time / update time</p>
      <ContentTitle onNext={onNext} />

      {data.map((item, index) => (
        <ContentEditor
          key={"fd" + index}
          autoFocus={index == 0 && titleNextFocus === "list" && focus}
          content={item.content}
          onSave={onEditSave}
        />
      ))}
      {newing && (
        <ContentEditor
          autoFocus={titleNextFocus === "new" && focus}
          onSave={onNewSave}
        />
      )}
      {fetching && ""}
      <button
        onClick={() => {
          setNewing(true);
        }}
      >
        add
      </button>
    </ScrollArea>
  );
};

export default MainContent;
