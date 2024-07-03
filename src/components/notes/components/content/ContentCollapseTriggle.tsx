import TooltipSimple from "@/components/ui/TooltipSimple";
import { PanelTopClose, PanelTopOpen } from "lucide-react";

const ContentCollapseTriggle = ({ isAllCollapse, toggleAllCollapse }) => {
  return (
    <TooltipSimple content={isAllCollapse ? "all expand" : "all collapse"}>
      {isAllCollapse ? (
        <PanelTopOpen onClick={toggleAllCollapse} />
      ) : (
        <PanelTopClose onClick={toggleAllCollapse} />
      )}
    </TooltipSimple>
  );
};

export default ContentCollapseTriggle;
