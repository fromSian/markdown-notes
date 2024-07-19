import { PanelLeftClose, PanelRightOpen } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import TooltipSimple from "../ui/tooltip-simple";

interface NotePartProps {
  showNavigation: boolean;
  setShowNavigation: Dispatch<SetStateAction<boolean>>;
  activeId?: string | number;
}

const NotePart = memo(
  ({ showNavigation, setShowNavigation }: NotePartProps) => {
    const { t } = useTranslation("header");
    return (
      <div className="flex-1 flex items-center gap-2">
        <TooltipSimple
          content={showNavigation ? t("hide-navigation") : t("show-navigation")}
        >
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
