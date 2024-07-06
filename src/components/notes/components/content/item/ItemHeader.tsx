import { cn } from "@/lib/utils";
import { ChevronDown, Trash } from "lucide-react";
import { memo } from "react";
import Status from "./Status";

const CollaspeTrigger = memo(
  ({ open, toggleOpen }: { open: boolean; toggleOpen: () => void }) => {
    return (
      <div
        onClick={toggleOpen}
        className="group cursor-pointer px-2 rounded-sm text-center flex items-center bg-secondary border border-transparent hover:border-border hover:bg-transparent py-1"
      >
        <ChevronDown
          size={16}
          className={cn(
            "text-ttertiary group-hover:text-tprimary transition-all",
            open && "rotate-180"
          )}
        />
      </div>
    );
  }
);

const DeleteTrigger = memo(({ handleDelete }: { handleDelete: () => void }) => {
  return (
    <div
      className="group cursor-pointer px-2 rounded-sm text-center flex items-center bg-secondary border border-transparent hover:border-border hover:bg-transparent py-1"
      onClick={handleDelete}
    >
      <Trash
        size={16}
        className="text-ttertiary group-hover:text-tprimary group-active:scale-95 transition-all"
      />
    </div>
  );
});

const HeaderText = memo(
  ({
    index,
    summary,
    open,
  }: {
    index: number;
    summary: string;
    open: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        <p>{index + 1}.</p>
        {!open && summary}
      </div>
    );
  }
);

interface ItemHeaderProps {
  open: boolean;
  toggleOpen: () => void;
  index: number;
  summary: string;
  isChanged: boolean;
  status: "loading" | "success" | "fail" | undefined;
  handleSave: () => void;
  handleDelete: () => void;
}

const ItemHeader = memo(
  ({
    toggleOpen,
    open,
    index,
    summary,
    isChanged,
    status,
    handleSave,
    handleDelete,
  }: ItemHeaderProps) => {
    return (
      <div className="flex justify-between gap-2 text-sm italic mb-2 items-center">
        <HeaderText index={index} open={open} summary={summary} />
        <div className="flex-shrink-0 flex gap-2 items-center">
          <Status
            isChanged={isChanged}
            status={status}
            handleSave={handleSave}
          />
          <DeleteTrigger handleDelete={handleDelete} />
          <CollaspeTrigger open={open} toggleOpen={toggleOpen} />
        </div>
      </div>
    );
  }
);

export default ItemHeader;
