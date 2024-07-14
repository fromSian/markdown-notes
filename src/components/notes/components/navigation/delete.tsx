import TooltipSimple from "@/components/ui/TooltipSimple";
import { getErrorMessage } from "@/request/error";
import { Loader, Trash2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";
const Delete = ({
  loading,
  handleDelete,
}: {
  loading: boolean;
  handleDelete: () => void;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onDelete = async (e: MouseEvent) => {
    try {
      e.stopPropagation();
      setDeleteLoading(true);
      await handleDelete();
      toast.success("delete successfully");
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };
  return (
    <TooltipSimple content={loading ? "delete" : "loading"}>
      <>
        {loading || deleteLoading ? (
          <Loader size={16} className="animate-spin group-hover:block hidden" />
        ) : (
          <Trash2
            size={16}
            onClick={onDelete}
            className="group-hover:block hidden cursor-pointer flex-shrink-0 transition-all text-ttertiary hover:text-tprimary active:scale-90"
          />
        )}
      </>
    </TooltipSimple>
  );
};

export default Delete;
