import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useCallback } from "react";
const ChaptersPanel = () => {
  const { showChapters } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const onPanelClick = useCallback(() => {
    if (showChapters) {
      return;
    }
    dispatch({
      type: "ui/toggleShowChapters",
    });
  }, [showChapters]);
  return (
    <section
      className={cn(
        "transition-all h-full bg-yellow-200 overflow-x-hidden",
        showChapters ? "" : "cursor-pointer"
      )}
      onClick={onPanelClick}
    >
      {showChapters && (
        <button
          onClick={() => {
            dispatch({
              type: "ui/toggleShowChapters",
            });
          }}
        >
          charpters show/hide
        </button>
      )}
    </section>
  );
};

export default ChaptersPanel;
