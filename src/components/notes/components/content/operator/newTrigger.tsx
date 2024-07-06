import TooltipSimple from "@/components/ui/TooltipSimple";
import { NotebookPen } from "lucide-react";
import { memo, MouseEvent } from "react";
const NewTriggle = memo(({ onClick }: { onClick: (e: MouseEvent) => void }) => {
  return (
    <TooltipSimple content={"add new item"}>
      <NotebookPen
        className="inline cursor-pointer active:scale-95 transition-transform"
        onClick={onClick}
      />
    </TooltipSimple>
  );
});

export default NewTriggle;
