import { Dispatch, SetStateAction } from "react";
import AddTrigger from "./AddTrigger";
import DateRange from "./DateRange";

interface HeaderProps {
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  newing: boolean;
  handleAddNew: () => void;
}

const Header = ({ setDate, newing, handleAddNew }: HeaderProps) => {
  return (
    <div
      className="w-full backdrop-blur-sm flex justify-between items-center px-4"
      style={{
        height: "36px",
      }}
    >
      <DateRange setDate={setDate} />

      <AddTrigger newing={newing} handleAddNew={handleAddNew} />
    </div>
  );
};

export default Header;
