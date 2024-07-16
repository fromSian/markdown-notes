import { PanelLeftClose, PanelRightOpen } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import TooltipSimple from "../ui/TooltipSimple";

interface NotePartProps {
  showNavigation: boolean;
  setShowNavigation: Dispatch<SetStateAction<boolean>>;
  activeId?: string | number;
}

const NotePart = memo(
  ({ showNavigation, setShowNavigation, activeId }: NotePartProps) => {
    return (
      <div className="flex-1 flex items-center gap-2">
        {activeId && (
          <TooltipSimple content={showNavigation ? "hide" : "show"}>
            <button
              onClick={() => {
                setShowNavigation((v) => !v);
              }}
            >
              {showNavigation ? <PanelLeftClose /> : <PanelRightOpen />}
            </button>
          </TooltipSimple>
        )}
      </div>
    );
  }
);

export default NotePart;
