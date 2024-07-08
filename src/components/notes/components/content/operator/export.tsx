import TooltipSimple from "@/components/ui/TooltipSimple";
import { Download } from "lucide-react";
import { memo } from "react";

const Export = memo(() => {
  return (
    <TooltipSimple content="export">
      <Download size={20} />
    </TooltipSimple>
  );
});

export default Export;
