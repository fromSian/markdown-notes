import TooltipSimple from "@/components/ui/TooltipSimple";
import { Download } from "lucide-react";

const ContentExport = () => {
  return (
    <TooltipSimple content="export">
      <Download />
    </TooltipSimple>
  );
};

export default ContentExport;
