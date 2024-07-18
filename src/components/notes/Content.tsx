import { cn } from "@/lib/utils";
import { downloadFile } from "@/request/notes";
import { useAppSelector } from "@/states/hooks";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ItemRef } from "./components/content/item/index.tsx";
import List from "./components/content/list.tsx";
import Operator from "./components/content/operator/index.tsx";

export type SortInfo = "updated" | "-updated" | "created" | "-created";

interface MainContentProps {}
const Content = memo(({}: MainContentProps) => {
  const {
    activeId,
    activeInfo,
    defaultExpanded,
    showExactTime,
    sortInfo: defaultSortInfo,
  } = useAppSelector((state) => state.note);

  const [adding, setAdding] = useState(false);
  const [sortInfo, setSortInfo] = useState<SortInfo>(defaultSortInfo);

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

  const handleExport = useCallback(async () => {
    await downloadFile(activeId);
    toast.success("export successfully");
  }, [activeId]);

  return (
    <div className={cn("relative w-full h-full pl-2 sm:pl-4")}>
      {activeId !== undefined && activeInfo ? (
        <>
          <Operator
            toggleExpand={toggleAllItem}
            handleAdding={handleAdding}
            sortInfo={sortInfo}
            setSortInfo={setSortInfo}
            handleExport={handleExport}
          />

          <List
            contentRefs={contentRefs}
            activeId={activeId}
            info={activeInfo}
            adding={adding}
            setAdding={setAdding}
            sortInfo={sortInfo}
            showExactTime={showExactTime}
            defaultExpanded={defaultExpanded}
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
