import TooltipSimple from "@/components/ui/TooltipSimple";
import { ChevronsUpDown } from "lucide-react";
import { memo } from "react";
const ExpandTrigger = memo(({ toggleExpand }: { toggleExpand: () => void }) => {
  return (
    <TooltipSimple content="toggle expand/fold">
      <ChevronsUpDown onClick={toggleExpand} size={20} />
    </TooltipSimple>
  );
});

export default ExpandTrigger;
