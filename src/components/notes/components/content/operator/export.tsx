import TooltipSimple from "@/components/ui/tooltip-simple";
import { Download } from "lucide-react";
import { memo } from "react";

interface ExportProps {
  handleExport: () => void;
}

const Export = memo(({ handleExport }: ExportProps) => {
  return (
    <TooltipSimple content="export">
      <Download size={20} onClick={handleExport} />
    </TooltipSimple>
  );
});

export default Export;
