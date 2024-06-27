import { cn } from "@/lib/utils";
import { NoteNavigationType } from "@/types/notes";
import { Trash2 } from "lucide-react";
const NavigationRenderItem = ({
  data,
  className = "",
}: {
  data: NoteNavigationType;
  className?: string;
}) => {
  return (
    <div
      className={cn(className, "group cursor-pointer mb-4 mx-4 pb-2 border-b")}
    >
      <div className="flex justify-between items-center">
        <p className="text-tprimary truncate">{data.title}</p>
        <Trash2
          size={16}
          className="group-hover:block hidden cursor-pointer flex-shrink-0 transition-all text-ttertiary hover:text-tprimary active:scale-90"
        />
      </div>

      <div className="flex gap-2 mt-1 text-sm">
        <p className="text-tsecondary truncate flex-shrink-0">{data.updated}</p>
        <p className="text-ttertiary truncate">{data.summary}</p>
      </div>

      <div></div>
    </div>
  );
};

export default NavigationRenderItem;
