import TooltipSimple from "@/components/ui/TooltipSimple";
import { downloadFile } from "@/request/notes";
import { Download } from "lucide-react";
import { memo } from "react";

const Export = memo(() => {
  const handleExport = async () => {
    try {
      await downloadFile(30);
    } catch (error) {}
  };
  return (
    <TooltipSimple content="export">
      <Download size={20} onClick={handleExport} />
    </TooltipSimple>
  );
});

export default Export;
