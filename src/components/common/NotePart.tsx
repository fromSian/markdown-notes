import { PanelLeftClose, PanelRightOpen } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import TooltipSimple from "../ui/TooltipSimple";

interface NotePartProps {
  showNavigation: boolean;
  setShowNavigation: Dispatch<SetStateAction<boolean>>;
  activeId?: string | number;
}

const NotePart = memo(
  ({ showNavigation, setShowNavigation }: NotePartProps) => {
    return (
      <div className="flex-1 flex items-center gap-2">
        <TooltipSimple content={showNavigation ? "hide" : "show"}>
          <p
            className="cursor-pointer"
            onClick={() => {
              setShowNavigation((v) => !v);
            }}
          >
            {showNavigation ? <PanelLeftClose /> : <PanelRightOpen />}
          </p>
        </TooltipSimple>
      </div>
    );
  }
);

export default NotePart;
