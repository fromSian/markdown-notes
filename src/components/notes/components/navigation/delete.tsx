import DeleteConfirm from "@/components/ui/delete-confirm";
import TooltipSimple from "@/components/ui/tooltip-simple";
import { getErrorMessage } from "@/request/error";
import { Loader } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
const Delete = ({
  loading,
  handleDelete,
}: {
  loading: boolean;
  handleDelete: () => void;
}) => {
  const { t } = useTranslation(["note", "message"]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onDelete = async (e: MouseEvent) => {
    try {
      e.stopPropagation();
      setDeleteLoading(true);
      await handleDelete();
      toast.success(t("delete successfully", { ns: "message" }));
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };
  return (
    <TooltipSimple
      content={
        loading || deleteLoading ? t("delete.loading") : t("delete.description")
      }
    >
      <>
        {loading || deleteLoading ? (
          <Loader size={16} className="animate-spin group-hover:block hidden" />
        ) : (
          <DeleteConfirm handleDelete={onDelete} />
        )}
      </>
    </TooltipSimple>
  );
};

export default Delete;
