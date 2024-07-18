import { getErrorMessage } from "@/request/error";
import { addNote } from "@/request/notes";
import { useAppDispatch } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { useCallback, useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import Header from "./components/navigation/header";
import List from "./components/navigation/list";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [data, setData] = useState<NoteNavigationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [newing, setNewing] = useState(false);

  const handleAddOneNote = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      setNewing(true);
      const response = await addNote();
      if (response) {
        setData((v) => [response, ...v]);
        dispatch({
          type: "note/setActive",
          payload: {
            info: response,
          },
        });
        setNewing(false);
      }
    } catch (error) {
      setNewing(false);
      toast.warning(getErrorMessage(error));
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <Header
        date={date}
        setDate={setDate}
        newing={newing}
        handleAddNew={handleAddOneNote}
        className={!date && !data.length ? "hidden" : "flex"}
      />

      <List
        date={date}
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        handleAddNew={handleAddOneNote}
      />
    </div>
  );
};

export default Navigation;
