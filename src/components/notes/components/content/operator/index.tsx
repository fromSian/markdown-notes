import { cn } from "@/lib/utils";
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
          "w-full flex pr-4 items-center rounded-b-sm",
          restLoading ? "justify-center" : "justify-between "
        )}
        style={{ height: "36px" }}
      >
        <ExpandTrigger toggleExpand={toggleExpand} />
        <NewTriggle onClick={handleAddNew} />
        <Export />
      </div>
    );
  }
);

export default Operator;
