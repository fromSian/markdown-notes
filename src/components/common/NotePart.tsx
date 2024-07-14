import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { PanelLeftClose, PanelRightOpen } from "lucide-react";
import { memo } from "react";
const NotePart = memo(() => {
  const { showNavigation } = useAppSelector((state) => state.ui);
  const { activeId } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();
  return (
    <div className="flex-1 flex items-center gap-2">
      {activeId && (
        <button
          onClick={() => {
            dispatch({
              type: "ui/toggleShowNavigation",
            });
          }}
        >
          {showNavigation ? <PanelLeftClose /> : <PanelRightOpen />}
        </button>
      )}
    </div>
  );
});

export default NotePart;
