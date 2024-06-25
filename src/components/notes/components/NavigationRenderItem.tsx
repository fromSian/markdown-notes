import { cn } from "@/lib/utils";
import { NoteNavigationType } from "@/types/notes";
const NavigationRenderItem = ({
  data,
  className = "",
}: {
  data: NoteNavigationType;
  className?: string;
}) => {
  return (
    <div className={cn(className, "cursor-pointer mb-4 mx-4 pb-2 border-b")}>
      <p className="text-tprimary truncate">{data.title}</p>

      <div className="flex gap-2 mt-1 text-sm">
        <p className="text-tsecondary truncate flex-shrink-0">{data.updated}</p>
        <p className="text-ttertiary truncate">{data.summary}</p>
      </div>

      <div></div>
    </div>
  );
};

export default NavigationRenderItem;
