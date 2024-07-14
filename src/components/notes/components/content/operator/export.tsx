import TooltipSimple from "@/components/ui/TooltipSimple";
import { Download } from "lucide-react";
import { memo } from "react";

const Export = memo(({ handleExport }) => {
  return (
    <TooltipSimple content="export">
      <Download size={20} onClick={handleExport} />
    </TooltipSimple>
  );
});

export default Export;
