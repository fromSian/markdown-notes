import { cn } from "@/lib/utils";
import { useAppSelector } from "@/states/hooks";
import { memo, useEffect, useRef, useState } from "react";
import { ItemRef } from "./components/content/item/index.tsx";
import List from "./components/content/list.tsx";
import Operator from "./components/content/operator/index.tsx";

export type SortInfo = {
  field: "updated" | "created";
  order: "asc" | "desc";
};

interface MainContentProps {}
const Content = memo(({}: MainContentProps) => {
  const { activeId, activeInfo } = useAppSelector((state) => state.note);

  const [adding, setAdding] = useState(false);
  const [sortInfo, setSortInfo] = useState<SortInfo>({
    field: "updated",
    order: "desc",
  });

  const contentRefs = useRef<ItemRef[]>([]);

  useEffect(() => {
    setAdding(false);
  }, [activeId]);

  const handleAdding = () => {
    setAdding(true);
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
    <div className={cn("relative w-full h-full pl-2 sm:pl-4")}>
      {activeId !== undefined && activeInfo ? (
        <>
          <Operator
            toggleExpand={toggleAllItem}
            handleAdding={handleAdding}
            sortInfo={sortInfo}
            setSortInfo={setSortInfo}
          />

          <List
            contentRefs={contentRefs}
            activeId={activeId}
            info={activeInfo}
            adding={adding}
            setAdding={setAdding}
            sortInfo={sortInfo}
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
