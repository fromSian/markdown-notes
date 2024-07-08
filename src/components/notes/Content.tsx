import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { memo, useCallback, useRef, useState, useTransition } from "react";
import List from "./components/content/list.tsx";
import Operator from "./components/content/operator/index.tsx";

interface MainContentProps {}
const Content = memo(({}: MainContentProps) => {
  const { noteInfo, activeNoteId, noteItems } = useAppSelector(
    (state) => state.noteItem
  );
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const [restLoading, setRestLoading] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddNew = useCallback(() => {
    setIsAddingNew(true);
  }, [noteItems]);

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
    <div className={cn("relative w-full h-full pl-4")}>
      {true ? (
        <>
          <Operator
            restLoading={restLoading}
            toggleExpand={toggleAllItem}
            handleAddNew={handleAddNew}
          />

          <List
            scrollRef={scrollRef}
            navigationId={2}
            data={data}
            setData={setData}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      ) : (
        ""
      )}
      {/* <BlockAlert /> */}
    </div>
  );
});

export default Content;
