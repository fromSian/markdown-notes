import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import {
  queryFirstNoteItems,
  queryRestNoteItems,
} from "@/states/noteItem.slice.ts";
import { Virtualizer } from "@tanstack/react-virtual";
import {
  MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Empty from "../ui/Empty";
import ContentTitle from "./components/content/ContentTitle";
import Items from "./components/content/Items.tsx";
import NewEditor from "./components/content/NewEditor.tsx";
import Operator from "./components/content/operator/index.tsx";
import Loading from "./Loading.tsx";
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
/**
 * 先加第一波然后promise all 其他的
 */
const Content = memo(({ virtualizerRef, chapterIndex }: MainContentProps) => {
  const { noteInfo, activeNoteId, noteItems } = useAppSelector(
    (state) => state.noteItem
  );
  const dispatch = useAppDispatch();
  const contentRefs = useRef([]);
  const newRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  const [restLoading, setRestLoading] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const onTitleNext = useCallback(() => {
    if (noteItems.length) {
      contentRefs.current[0].focus("end");
    } else {
      newRef.current.focus("end");
    }
  }, [noteItems]);
  /**
   * 全部加载完然后一起expanded
   *
   */

  const fetchRestNoteItems = async (id, restPages) => {
    try {
      setRestLoading(true);
      setTimeout(async () => {
        const response = await dispatch(
          queryRestNoteItems({ id, restPages })
        ).unwrap();
        setRestLoading(false);
      }, 3000);
    } catch (error) {}
  };
  const fetchFirstNoteItems = async (id) => {
    try {
      const response = await dispatch(queryFirstNoteItems({ id })).unwrap();
      const { restPages } = response;

      if (restPages.length) {
        fetchRestNoteItems(id, restPages);
        setInitialLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!activeNoteId) {
      return;
    }
    setTimeout(() => {
      fetchFirstNoteItems(activeNoteId);
      // handleAddNew();
    }, 3000);
  }, [activeNoteId]);

  const handleAddNew = useCallback(() => {
    setIsAddingNew(true);
  }, [noteItems]);

  const onExistAddNew = () => {
    setIsAddingNew(false);
  };

  const onSave = () => {
    setTimeout(() => {
      dispatch({
        type: "save/setSaving",
        payload: false,
      });
    }, 5000);
  };

  const toggleAllItem = () => {
    if (!contentRefs.current.length) {
      return;
    }
    const isAllExpanded = contentRefs.current.reduce((prev, cur) => {
      return prev && cur.open;
    }, true);
    contentRefs.current.forEach((item) => {
      item.setAllState(!isAllExpanded);
    });
  };

  return (
    <div className={cn("relative w-full h-full overflow-auto pb-4")}>
      {activeNoteId && initialLoaded ? (
        <>
          <Operator
            restLoading={restLoading}
            toggleExpand={toggleAllItem}
            handleAddNew={handleAddNew}
          />
          <div className="pl-4 float-left">
            <ContentTitle
              created={noteInfo?.created}
              updated={noteInfo?.updated}
              count={noteInfo?.count}
              initialValue={noteInfo?.title}
              onNext={onTitleNext}
            />
          </div>
          <div className="pl-4 clear-both">
            {noteItems && noteItems.length ? (
              <Items datas={noteItems} contentRefs={contentRefs} />
            ) : (
              ""
            )}
          </div>

          {isAddingNew && (
            <NewEditor ref={newRef} onExistAddNew={onExistAddNew} />
          )}
        </>
      ) : (
        ""
      )}
      {/* <BlockAlert /> */}
      {!initialLoaded ? <Loading /> : !activeNoteId ? <Empty /> : ""}
    </div>
  );
});

export default Content;
