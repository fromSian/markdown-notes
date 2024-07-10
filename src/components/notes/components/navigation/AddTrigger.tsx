import { cn } from "@/lib/utils";
import { Loader, NotebookPen } from "lucide-react";
import { memo } from "react";
interface AddTriggerProps {
  newing: boolean;
  handleAddNew: () => void;
  newingBounce: boolean;
}

const AddTrigger = memo(
  ({ newing, handleAddNew, newingBounce }: AddTriggerProps) => {
    return newing ? (
      <Loader className="animate-spin" />
    ) : (
      <NotebookPen
        className={cn("cursor-pointer", newingBounce && "animate-pulse")}
        size={20}
        onClick={handleAddNew}
      />
    );
  }
);

export default AddTrigger;
