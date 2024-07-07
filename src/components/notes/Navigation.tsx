import { NoteNavigationType } from "@/types/notes";
import { addDays } from "date-fns";
import { useCallback, useState } from "react";
import type { DateRange } from "react-day-picker";
import { v4 as uuid4 } from "uuid";
import Header from "./components/navigation/header";
import List from "./components/navigation/list";

const Navigation = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [data, setData] = useState<NoteNavigationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [newing, setNewing] = useState(false);

  const handleAddOneNote = useCallback(async () => {
    if (loading) {
      return;
    }
    setNewing(true);
    setTimeout(() => {
      /**
       * no use this
       * post the new items
       * reset the date
       * refetching the data
       */
      setData((v) => [
        {
          id: uuid4(),
          title: "new title",
          summary: "new summary",
          created: "new created",
          updated: "new updated",
        },
        ...v,
      ]);
      setNewing(false);
    }, 3000);
  }, []);

  return (
    <div className="w-full h-full">
      <Header
        setDate={setDate}
        newing={newing}
        handleAddNew={handleAddOneNote}
      />
      <List
        date={date}
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Navigation;
