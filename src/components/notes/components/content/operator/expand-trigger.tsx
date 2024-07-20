import TooltipSimple from "@/components/ui/tooltip-simple";
import { ChevronsUpDown } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
const ExpandTrigger = memo(({ toggleExpand }: { toggleExpand: () => void }) => {
  const { t } = useTranslation("note");
  return (
    <TooltipSimple content={t("toggle-expand")}>
      <ChevronsUpDown onClick={toggleExpand} size={20} />
    </TooltipSimple>
  );
});

export default ExpandTrigger;
