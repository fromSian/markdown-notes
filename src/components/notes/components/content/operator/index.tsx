import { cn } from "@/lib/utils";
import { SortInfo } from "@/types/notes";
import { Dispatch, memo, SetStateAction } from "react";
import ExpandTrigger from "./expand-trigger";
import Export from "./export";
import NewTriggle from "./new-trigger";
import Sort from "./sort";
interface OperatorProps {
  sortInfo: SortInfo;
  setSortInfo: Dispatch<SetStateAction<SortInfo>>;
  toggleExpand: () => void;
  handleAdding: () => void;
  handleExport: () => void;
}
const Operator = memo(
  ({
    sortInfo,
    setSortInfo,
    toggleExpand,
    handleAdding,
    handleExport,
  }: OperatorProps) => {
    return (
      <div
        className={cn(
          "w-full flex pr-4 items-center rounded-b-sm justify-between"
        )}
        style={{ height: "36px" }}
      >
        <ExpandTrigger toggleExpand={toggleExpand} />
        <NewTriggle onClick={handleAdding} />
        <Export handleExport={handleExport} />
        <Sort sortInfo={sortInfo} setSortInfo={setSortInfo} />
      </div>
    );
  }
);

export default Operator;
