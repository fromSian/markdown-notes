import { Dispatch, memo, SetStateAction } from "react";
import AddTrigger from "./AddTrigger";
import DateRange from "./DateRange";

interface HeaderProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  newing: boolean;
  handleAddNew: () => void;
  newingBounce: boolean;
}

const Header = memo(
  ({ date, setDate, newing, handleAddNew, newingBounce }: HeaderProps) => {
    return (
      <div
        className="w-full backdrop-blur-sm flex justify-between items-center px-4"
        style={{
          height: "36px",
        }}
      >
        <DateRange disabled={newing} setDate={setDate} date={date} />

        <AddTrigger
          newing={newing}
          handleAddNew={handleAddNew}
          newingBounce={newingBounce}
        />
      </div>
    );
  }
);

export default Header;
