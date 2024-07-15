import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";

const sortOptions = [
  {
    label: "created",
    value: "created",
  },
  {
    label: "-created",
    value: "-created",
  },
];
const Note = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [sortInfo, setSortInfo] = useState("created");
  return (
    <>
      <div className="divider italic my-4">note</div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-4 rounded-md bg-slate-600">
          <TitleKit title={"expanded"} info={"expanded"} />
          <Switch
            checked={isExpanded}
            onCheckedChange={(e) => setIsExpanded(e)}
          />
        </div>
        <div className="flex justify-between py-2 px-4 rounded-md bg-slate-600">
          <TitleKit title={"show time"} info={"show time"} />
          <Switch checked={showTime} onCheckedChange={(e) => setShowTime(e)} />
        </div>
        <div className="flex justify-between py-2 px-4 rounded-md bg-slate-600">
          <TitleKit title={"sort info"} info={"sort info"} />
          <SelectValue
            value={sortInfo}
            setValue={setSortInfo}
            items={sortOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Note;
