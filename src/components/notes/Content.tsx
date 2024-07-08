import { cn } from "@/lib/utils";
import { useAppSelector } from "@/states/hooks";
import { memo, useRef, useState, useTransition } from "react";
import List from "./components/content/list.tsx";
import Operator from "./components/content/operator/index.tsx";

interface MainContentProps {}
const Content = memo(({}: MainContentProps) => {
  const { activeId, activeInfo } = useAppSelector((state) => state.note);
  const [isPending, startTransition] = useTransition();

  const [adding, setAdding] = useState(false);

  const contentRefs = useRef([]);

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
    <div className={cn("relative w-full h-full pl-4")}>
      {activeId !== undefined && activeInfo ? (
        <>
          <Operator toggleExpand={toggleAllItem} handleAdding={handleAdding} />

          <List
            contentRefs={contentRefs}
            activeId={activeId}
            info={activeInfo}
            adding={adding}
            setAdding={setAdding}
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
