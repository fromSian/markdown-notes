import { Trash2 } from "lucide-react";
import { MouseEvent, ReactNode, useState } from "react";
import Select from "./select";

interface DeleteConfirmProps {
  handleDelete: (e: MouseEvent) => void;
  content?: ReactNode;
}

const DeleteConfirm = ({ handleDelete, content }: DeleteConfirmProps) => {
  const [open, setOpen] = useState(false);
  const onCancel = () => {
    setOpen(false);
  };

  const onOk = async (e: MouseEvent) => {
    await handleDelete(e);
    setOpen(false);
  };

  const onIconClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Select
      side="top"
      open={open}
      setOpen={setOpen}
      content={
        content || (
          <Trash2
            size={16}
            onClick={onIconClick}
            className="cursor-pointer flex-shrink-0 transition-all text-ttertiary hover:text-tprimary active:scale-90"
          />
        )
      }
    >
      <div className="w-56">
        <p className="text-sm font-bold mb-4">Are you sure to delete?</p>
        <div className="flex justify-end gap-4 text-sm">
          <button className="btn px-2" onClick={onCancel}>
            no
          </button>
          <button className="btn px-2" onClick={onOk}>
            yes
          </button>
        </div>
      </div>
    </Select>
  );
};

export default DeleteConfirm;
