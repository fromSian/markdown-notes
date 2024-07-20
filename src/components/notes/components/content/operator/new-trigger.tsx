import TooltipSimple from "@/components/ui/tooltip-simple";
import { FilePenLine } from "lucide-react";
import { memo, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
const NewTriggle = memo(({ onClick }: { onClick: (e: MouseEvent) => void }) => {
  const { t } = useTranslation("note");
  return (
    <TooltipSimple content={t("add-one")}>
      <FilePenLine
        size={20}
        className="cursor-pointer active:scale-95 transition-transform"
        onClick={onClick}
      />
    </TooltipSimple>
  );
});

export default NewTriggle;
