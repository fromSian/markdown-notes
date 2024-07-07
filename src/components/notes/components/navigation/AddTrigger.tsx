import { Loader, NotebookPen } from "lucide-react";
interface AddTriggerProps {
  newing: boolean;
  handleAddNew: () => void;
}

const AddTrigger = ({ newing, handleAddNew }: AddTriggerProps) => {
  return newing ? (
    <Loader className="animate-spin" />
  ) : (
    <NotebookPen className="cursor-pointer" size={20} onClick={handleAddNew} />
  );
};

export default AddTrigger;
