import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { PanelLeftClose, PanelRightOpen, Search } from "lucide-react";
import { memo } from "react";
const NotePart = memo(() => {
  const { showNavigation } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  return (
    <div className="flex-1 flex items-center gap-2">
      <button
        onClick={() => {
          dispatch({
            type: "ui/toggleShowNavigation",
          });
        }}
      >
        {showNavigation ? <PanelLeftClose /> : <PanelRightOpen />}
      </button>
      <Search />
    </div>
  );
});

export default NotePart;
