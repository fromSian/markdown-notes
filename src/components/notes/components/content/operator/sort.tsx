import SelectValue from "@/components/settings/content/select-value";
import { SortInfo } from "@/types/notes";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const SortLabel = ({
  field,
  up = true,
}: {
  field: "updated" | "created";
  up?: boolean;
}) => {
  const { t } = useTranslation("note");

  return (
    <p className="flex gap-0 text-sm items-center justify-between">
      {t(field)}
      {up ? (
        <ArrowUp size={20} className="text-ttertiary" />
      ) : (
        <ArrowDown size={20} className="text-ttertiary" />
      )}
    </p>
  );
};
export const sortOptions = [
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
      setValue={setSortInfo as Dispatch<SetStateAction<string>>}
      items={sortOptions}
      className={"border-none bg-transparent"}
    />
  );
};
export default Sort;
