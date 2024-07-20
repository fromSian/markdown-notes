import { Trash2 } from "lucide-react";
import { MouseEvent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "./select";

interface DeleteConfirmProps {
  handleDelete: (e: MouseEvent) => void;
  content?: ReactNode;
}

const DeleteConfirm = ({ handleDelete, content }: DeleteConfirmProps) => {
  const { t } = useTranslation("note");
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
          <div
            className="p-2 hover:bg-secondary rounded-md"
            onClick={onIconClick}
          >
            <Trash2
              size={16}
              className="cursor-pointer flex-shrink-0 transition-all text-ttertiary hover:text-tprimary active:scale-90"
            />
          </div>
        )
      }
    >
      <div className="max-w-56">
        <p className="text-sm font-bold mb-4">{t("delete.confirm")}</p>
        <div className="flex justify-end gap-4 text-sm">
          <button className="btn px-2" onClick={onCancel}>
            {t("delete.no")}
          </button>
          <button className="btn px-2" onClick={onOk}>
            {t("delete.yes")}
          </button>
        </div>
      </div>
    </Select>
  );
};

export default DeleteConfirm;
