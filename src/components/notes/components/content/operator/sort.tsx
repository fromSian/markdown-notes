import { SortInfo } from "@/components/notes/Content";
import SelectValue from "@/components/settings/content/select-value";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const SortLabel = ({
  field,
  up = true,
}: {
  field: "updated" | "created";
  up?: boolean;
}) => (
  <p className="flex gap-0 text-sm items-center justify-between">
    {field}
    {up ? (
      <ArrowUp size={20} className="text-ttertiary" />
    ) : (
      <ArrowDown size={20} className="text-ttertiary" />
    )}
  </p>
);
const sortOptions = [
  {
    label: <SortLabel field={"updated"} />,
    value: "-updated",
  },
  {
    label: <SortLabel field={"updated"} up={false} />,
    value: "updated",
  },
  {
    label: <SortLabel field={"created"} />,
    value: "-created",
  },
  {
    label: <SortLabel field={"created"} up={false} />,
    value: "created",
  },
];

const Sort = ({
  sortInfo,
  setSortInfo,
}: {
  sortInfo: SortInfo;
  setSortInfo: Dispatch<SetStateAction<SortInfo>>;
}) => {
  return (
    <SelectValue
      value={sortInfo}
      setValue={setSortInfo}
      items={sortOptions}
      className={"border-none bg-transparent"}
    />
  );
};
export default Sort;
