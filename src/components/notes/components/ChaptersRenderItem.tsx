import { cn } from "@/lib/utils";
import { NoteChaptersStatusType } from "@/types/notes";
import {
  AlertCircle,
  Check,
  Equal,
  ListPlus,
  LoaderCircle,
  Trash2,
} from "lucide-react";
import { ReactNode, memo } from "react";
const colors = ["#C7C23860", "#66BA0060", "#DE202060", "#5B63B760", "red"];

const status: (keyof typeof NoteChaptersStatusType)[] = [
  "new",
  "saving",
  "saved",
  "nochanges",
  "saveFailed",
];

const StatusIcon: Record<keyof typeof NoteChaptersStatusType, ReactNode> = {
  new: <ListPlus className="hidden sm:block min-w-4" />,
  saved: <Check className="hidden sm:block min-w-4" />,
  saving: <LoaderCircle className="hidden sm:block animate-spin min-w-4" />,
  nochanges: <Equal className="hidden sm:block min-w-4" />,
  saveFailed: <AlertCircle className="hidden sm:block min-w-4" />,
};

interface ChaptersRenderItemProps {
  index: number;
  showChapters: boolean;
}

const ChaptersRenderItem = memo(
  ({ index, showChapters }: ChaptersRenderItemProps) => {
    return (
      <div
        className={cn(
          "group min-h-[2rem] mb-2 flex items-center pl-1 pr-2 gap-1 justify-center",
          index === 3 && "border-4"
        )}
        style={{
          backgroundColor: colors[index % colors.length],
        }}
      >
        {/* <p className="text-tsecondary flex-shrink-0 w-[4rem] text-center truncate text-xs italic">
        {status[index % colors.length] || "default"}
      </p> */}
        {showChapters && (
          <>
            {StatusIcon[status[index % colors.length]]}
            <p className="select-none hidden sm:block text-ttertiary truncate">
              I want to go out, and never come back.
            </p>
            <Trash2 className="hidden group-hover:block min-w-4 cursor-pointer" />
          </>
        )}
      </div>
    );
  }
);

export default ChaptersRenderItem;
