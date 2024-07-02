import TooltipSimple from "@/components/ui/TooltipSimple";
import { NotebookPen } from "lucide-react";
import { MouseEvent } from "react";
const ContentNewTriggle = ({
  onClick,
}: {
  onClick: (e: MouseEvent) => void;
}) => {
  return (
    <TooltipSimple content={"add new item"}>
      <NotebookPen
        className="inline cursor-pointer active:scale-95 transition-transform"
        onClick={onClick}
      />
    </TooltipSimple>
  );
};

export default ContentNewTriggle;

/**peer rounded relative py-2 before:content-[''] before:absolute before:w-full before:h-full before:bg-secondary before:top-0 before:right-0 before:-z-10 before:scale-0 hover:before:scale-100 before:transition-all before:rounded active:scale-90 */
