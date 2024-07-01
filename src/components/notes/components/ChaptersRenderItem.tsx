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
import { MouseEvent, ReactNode, memo, useCallback, useTransition } from "react";
const colors = [
  "hsl(204.07, 69.87%, 53.14%, 60%)",
  "hsl(44.13, 83.78%, 63.73%, 60%)",
  "hsl(122.58, 40.97%, 44.51%, 60%)",
  "hsl(227.59, 45.08%, 37.84%, 60%)",
  "hsl(1.13, 83.25%, 62.55%, 60%)",
];

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
  onChapterClick: (index: number) => void;
}

const ChaptersRenderItem = memo(
  ({ index, showChapters, onChapterClick }: ChaptersRenderItemProps) => {
    const [isPending, startTransition] = useTransition();
    const onItemClick = useCallback(() => {
      console.log(index);
      onChapterClick(index);
    }, [index]);

    const onDelete = useCallback((event: MouseEvent) => {
      event.stopPropagation();
    }, []);

    return (
      <div
        className={cn(
          "group min-h-[2rem] mb-2 flex items-center pl-1 pr-2 gap-1 justify-center cursor-pointer"
        )}
        style={{
          backgroundColor: colors[index % colors.length],
        }}
        onClick={onItemClick}
      >
        {/* <p className="text-tsecondary flex-shrink-0 w-[4rem] text-center truncate text-xs italic">
        {status[index % colors.length] || "default"}
      </p> */}
        {StatusIcon[status[index % colors.length]]}
        <p className="select-none hidden sm:block text-ttertiary truncate">
          I want to go out, and never come back.
        </p>
        <Trash2
          className="hidden group-hover:block min-w-4 cursor-pointer"
          onClick={onDelete}
        />
      </div>
    );
  }
);

export default ChaptersRenderItem;
