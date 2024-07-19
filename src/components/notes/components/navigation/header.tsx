import { cn } from "@/lib/utils";
import { Dispatch, memo, SetStateAction } from "react";
import AddTrigger from "./add-trigger";
import DateRange from "./date-range";

interface HeaderProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  newing: boolean;
  handleAddNew: () => void;
  className: string;
}

const Header = memo(
  ({ date, setDate, newing, handleAddNew, className = "" }: HeaderProps) => {
    return (
      <div
        className={cn(
          "w-full backdrop-blur-sm flex justify-between items-center px-4",
          className
        )}
        style={{
          height: "36px",
        }}
      >
        <DateRange disabled={newing} setDate={setDate} date={date} />

        <AddTrigger newing={newing} handleAddNew={handleAddNew} />
      </div>
    );
  }
);

export default Header;
