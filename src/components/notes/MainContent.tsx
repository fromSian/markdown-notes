import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { NoteContentType } from "@/types/notes";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Skeleton } from "../ui/skeleton";
import ContentEditor from "./components/content/ContentEditor";
import ContentNewTriggle from "./components/content/ContentNewTriggle";
import ContentTitle from "./components/content/ContentTitle";
import NoteDate from "./components/content/NoteDate";

const MainContent = () => {
  const { showChapters } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [newing, setNewing] = useState(false);
  const [focus, setFocus] = useState(false);

  const [fetching, setFetching] = useState(false);

  const [data, setData] = useState<NoteContentType[]>([]);

  const fetchData = () => {
    try {
      setData([
        {
          id: 1,
          content: "",
          updated: "",
          created: "",
          type: "new",
        },
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const titleNextFocus = useMemo(
    () => (data.length ? "list" : "new"),
    [[data]]
  );
  const [isPending, startTransition] = useTransition();
  /**
   *
   * add new 时 加一条到data 不要放到newing里
   */

  const onNewSave = useCallback((text: string) => {
    console.log(text);
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
    console.log(text);
    // if (!text) {
    // not do this
    //   console.log("are you sure you want to delete this");
    // }
  }, []);

  const handleAddNew = useCallback(() => {
    startTransition(() => {
      setData((v) => [
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
    console.log(titleNextFocus);
  }, [titleNextFocus]);

  return (
    <div className="transition-all h-full w-full p-4">
      <ContentTitle onNext={onNext} initialValue="title" />
      <NoteDate created="2012-2-3" updated="2014-2-3" />

      {data.map((item, index) => (
        <ContentEditor
          key={"fd" + index}
          autoFocus={index == 0 && focus}
          content={item.content}
          onSave={onEditSave}
        />
      ))}

      {fetching && <Skeleton className="w-full h-4" />}
      <ContentNewTriggle onClick={handleAddNew} />
    </div>
  );
};

export default MainContent;
