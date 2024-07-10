import { getDateTimeInCurrentTimeZone } from "@/lib/timezone";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { memo } from "react";
import Delete from "./delete";
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
    handleDelete: (id: string | number) => void;
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

    return (
      <div
        className={cn(
          className,
          "group cursor-pointer py-4 px-1 xs:px-2 sm:px-4 border-b rounded",
          active && "bg-secondary"
        )}
        onClick={onItemClick}
      >
        <div className="flex justify-between items-center mb-2">
          <p className="text-tprimary truncate">
            {item.title || "no title"}
            {item.id}
          </p>
          <Delete
            handleDelete={() => handleDelete(item.id)}
            loading={loading}
          />
        </div>

        <div className="flex gap-2 mt-1 text-sm">
          <p className="text-tsecondary truncate flex-shrink-0">
            {getDateTimeInCurrentTimeZone(item.updated)}
          </p>
          <p className="text-ttertiary truncate">{item.summary}</p>
        </div>
      </div>
    );
  }
);

export default Item;
