import Fail from "@/components/icons/fail";
import SuccessIcon from "@/components/icons/success";
import TooltipSimple from "@/components/ui/tooltip-simple";
import { cn } from "@/lib/utils";
import { Loader, Save } from "lucide-react";

const Success = () => {
  return (
    <TooltipSimple content="save successfully">
      <SuccessIcon />
    </TooltipSimple>
  );
};

const FailIcon = ({ handleSave }: { handleSave: () => void }) => {
  return (
    <TooltipSimple content="save failed, click to try again">
      <Fail onClick={handleSave} />
    </TooltipSimple>
  );
};
const LoadingIcon = () => {
  return (
    <div className="px-2 rounded-sm text-center flex items-center bg-secondary py-1">
      <Loader size={16} className="animate-spin" />
    </div>
  );
};

const SaveIcon = ({ handleSave }: { handleSave: () => void }) => {
  return (
    <TooltipSimple content="save">
      <div
        onClick={handleSave}
        className="cursor-pointer px-2 rounded-sm text-center flex items-center bg-yellow-500 bg-opacity-50 border border-transparent hover:border-border hover:bg-transparent py-1"
      >
        <Save
          size={16}
          className={cn(
            "text-ttertiary group-hover:text-tprimary group-active:scale-95 transition-all"
          )}
        />
      </div>
    </TooltipSimple>
  );
};

interface StatusProps {
  isChanged: boolean;
  status: "loading" | "success" | "fail" | undefined;
  handleSave: () => void;
}
const Status = ({ isChanged, status, handleSave }: StatusProps) => {
  return (
    <div className="flex gap-2 items-center">
      {status === "fail" && <FailIcon handleSave={handleSave} />}
      {status === "success" && <Success />}
      {status === "loading" && <LoadingIcon />}
      {isChanged && status !== "loading" && (
        <SaveIcon handleSave={handleSave} />
      )}
    </div>
  );
};

export default Status;
