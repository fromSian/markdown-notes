import TooltipSimple from "@/components/ui/tooltip-simple";
import { Download } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface ExportProps {
  handleExport: () => void;
}

const Export = memo(({ handleExport }: ExportProps) => {
  const { t } = useTranslation("note");
  return (
    <TooltipSimple content={t("export")}>
      <Download size={20} onClick={handleExport} />
    </TooltipSimple>
  );
});

export default Export;
