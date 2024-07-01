import { cn } from "@/lib/utils";
import { NoteChaptersStatusType, NoteChaptersType } from "@/types/notes";
import {
  AlertCircle,
  Check,
  CircleX,
  Equal,
  ListPlus,
  LoaderCircle,
} from "lucide-react";
import { MouseEvent, ReactNode, memo, useCallback, useTransition } from "react";

const StatusColors: Record<keyof typeof NoteChaptersStatusType, string> = {
  new: "hsl(204.07, 69.87%, 53.14%, 60%)",
  saving: "hsl(44.13, 83.78%, 63.73%, 60%)",
  saved: "hsl(122.58, 40.97%, 44.51%, 60%)",
  nochanges: "hsl(227.59, 45.08%, 37.84%, 60%)",
  saveFailed: "hsl(1.13, 83.25%, 62.55%, 60%)",
};
const StatusIcon: Record<keyof typeof NoteChaptersStatusType, ReactNode> = {
  new: <ListPlus className="hidden sm:block min-w-4 flex-shrink-0" />,
  saved: <Check className="hidden sm:block min-w-4 flex-shrink-0" />,
  saving: (
    <LoaderCircle className="hidden sm:block animate-spin min-w-4 flex-shrink-0" />
  ),
  nochanges: <Equal className="hidden sm:block min-w-4 flex-shrink-0" />,
  saveFailed: <AlertCircle className="hidden sm:block min-w-4 flex-shrink-0" />,
};

interface ChaptersRenderItemProps {
  index: number;
  data: NoteChaptersType;
  onChapterClick: (index: number) => void;
}

const ChaptersRenderItem = memo(
  ({ index, data, onChapterClick }: ChaptersRenderItemProps) => {
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
          "group min-h-[2rem] mb-2 flex items-center pl-2 pr-4 gap-1 cursor-pointer relative"
        )}
        style={{
          backgroundColor: StatusColors[data.status],
        }}
        onClick={onItemClick}
      >
        {StatusIcon[data.status]}
        <p className="select-none hidden sm:block text-ttertiary truncate text-sm">
          {data.summary || ""}
        </p>

        <CircleX
          size={16}
          onClick={onDelete}
          className="invisible absolute top-0 right-0 cursor-pointer group-hover:visible transition-all active:scale-90"
        />
      </div>
    );
  }
);

export default ChaptersRenderItem;
