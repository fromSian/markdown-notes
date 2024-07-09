import { cn } from "@/lib/utils";
import { memo } from "react";
import ExpandTrigger from "./expandTrigger";
import Export from "./export";
import NewTriggle from "./newTrigger";
import Sort from "./sort";
interface OperatorProps {
  toggleExpand: () => void;
  handleAdding: () => void;
}
const Operator = memo(
  ({ sortInfo, setSortInfo, toggleExpand, handleAdding }: OperatorProps) => {
    return (
      <div
        className={cn(
          "w-full flex pr-4 items-center rounded-b-sm justify-between"
        )}
        style={{ height: "36px" }}
      >
        <ExpandTrigger toggleExpand={toggleExpand} />
        <Sort sortInfo={sortInfo} setSortInfo={setSortInfo} />
        <NewTriggle onClick={handleAdding} />
        <Export />
      </div>
    );
  }
);

export default Operator;
