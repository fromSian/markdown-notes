import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { memo } from "react";
import ExpandTrigger from "./expandTrigger";
import Export from "./export";
import NewTriggle from "./newTrigger";

interface OperatorProps {
  restLoading: boolean;
  toggleExpand: () => void;
  handleAddNew: () => void;
}
const Operator = memo(
  ({ restLoading, toggleExpand, handleAddNew }: OperatorProps) => {
    return (
      <div
        className={cn(
          "sticky float-right top-0 w-32 flex h-10 px-4 items-center bg-primary-foreground opacity-65",
          restLoading ? "justify-center" : "justify-between "
        )}
      >
        {restLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            <ExpandTrigger toggleExpand={toggleExpand} />
            <NewTriggle onClick={handleAddNew} />
            <Export />
          </>
        )}
      </div>
    );
  }
);

export default Operator;
