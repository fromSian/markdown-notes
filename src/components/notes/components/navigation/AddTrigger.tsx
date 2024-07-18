import { cn } from "@/lib/utils";
import { Loader, NotebookPen } from "lucide-react";
import { memo } from "react";
interface AddTriggerProps {
  newing: boolean;
  handleAddNew: () => void;
}

const AddTrigger = memo(({ newing, handleAddNew }: AddTriggerProps) => {
  return newing ? (
    <Loader className="animate-spin" />
  ) : (
    <NotebookPen
      className={cn("cursor-pointer")}
      size={20}
      onClick={handleAddNew}
    />
  );
});

export default AddTrigger;
