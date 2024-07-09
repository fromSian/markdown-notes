import TooltipSimple from "@/components/ui/TooltipSimple";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { Loader, Trash2 } from "lucide-react";
import { memo } from "react";
const Item = memo(
  ({
    index,
    item,
    active,
    loading,
    handleDelete,
    className = "",
  }: {
    index: number;
    item: NoteNavigationType;
    active: boolean;
    loading: boolean;
    handleDelete: (id: string | number | undefined) => void;
    className?: string;
  }) => {
    const dispatch = useAppDispatch();

    const onItemClick = () => {
      dispatch({
        type: "note/setActive",
        payload: {
          info: item,
        },
      });
    };

    const onDelete = (e) => {
      e.stopPropagation();
      handleDelete(item.id);
    };

    return (
      <div
        className={cn(
          className,
          "group cursor-pointer py-4 px-1 xs:px-2 sm:px-4 border-b rounded",
          active && "bg-secondary"
        )}
        onClick={onItemClick}
      >
        <div className="flex justify-between items-center">
          <p className="text-tprimary truncate">
            {index}-{item.title}
          </p>
          <TooltipSimple content={123}>
            <>
              {loading ? (
                <Loader
                  size={16}
                  className="animate-spin group-hover:block hidden"
                />
              ) : (
                <Trash2
                  size={16}
                  onClick={onDelete}
                  className="group-hover:block hidden cursor-pointer flex-shrink-0 transition-all text-ttertiary hover:text-tprimary active:scale-90"
                />
              )}
            </>
          </TooltipSimple>
        </div>

        <div className="flex gap-2 mt-1 text-sm">
          <p className="text-tsecondary truncate flex-shrink-0">
            {item.updated}
          </p>
          <p className="text-ttertiary truncate">{item.summary}</p>
        </div>
      </div>
    );
  }
);

export default Item;
