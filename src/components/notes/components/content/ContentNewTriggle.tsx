import { NotebookPen } from "lucide-react";
import { MouseEvent } from "react";
const ContentNewTriggle = ({
  onClick,
}: {
  onClick: (e: MouseEvent) => void;
}) => {
  return (
    <div className="w-full text-center text-tsecondary">
      <button
        className="peer rounded relative px-4 py-2 before:content-[''] before:absolute before:w-full before:h-full before:bg-secondary before:top-0 before:right-0 before:-z-10 before:scale-0 hover:before:scale-100 before:transition-all before:rounded active:scale-90"
        onClick={onClick}
      >
        <NotebookPen className="inline" /> add new item
      </button>
    </div>
  );
};

export default ContentNewTriggle;
