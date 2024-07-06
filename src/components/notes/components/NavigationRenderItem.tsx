import TooltipSimple from "@/components/ui/TooltipSimple";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/states/hooks";
import { deleteNote } from "@/states/note.slice";
import { setActiveNoteId } from "@/states/noteItem.slice";
import { NoteNavigationType } from "@/types/notes";
import { Loader, Trash2 } from "lucide-react";
const NavigationRenderItem = ({
  index,
  item,
  active,
  disableDelete,
  className = "",
}: {
  index: number;
  item: NoteNavigationType;
  active: boolean;
  disableDelete: boolean;
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  const onItemClick = () => {
    dispatch(setActiveNoteId({ id: item.id }));
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteNote({ id: item.id })).unwrap();
    } catch (error) {}
  };

  return (
    <div
      className={cn(
        className,
        "group cursor-pointer py-2 px-4  border-b rounded",
        active && "bg-secondary"
      )}
      onClick={onItemClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-tprimary truncate">
          {item.id} - {index}-{item.title}
        </p>
        <TooltipSimple content={disableDelete ? "loading" : "delete"}>
          {disableDelete ? (
            <Loader
              size={16}
              className="animate-spin group-hover:block hidden"
            />
          ) : (
            <Trash2
              size={16}
              onClick={handleDelete}
              className="group-hover:block hidden cursor-pointer flex-shrink-0 transition-all text-ttertiary hover:text-tprimary active:scale-90"
            />
          )}
        </TooltipSimple>
      </div>

      <div className="flex gap-2 mt-1 text-sm">
        <p className="text-tsecondary truncate flex-shrink-0">{item.updated}</p>
        <p className="text-ttertiary truncate">{item.summary}</p>
      </div>

      <div></div>
    </div>
  );
};

export default NavigationRenderItem;
