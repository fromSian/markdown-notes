import { Popover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { ArrowUpDown } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
interface AlternativeProps {
  options: { value: string | number; label: string | number }[];
  active: string | number;
  onActive: (value: string | number) => void;
}
const Alternative = ({ options, active, onActive }: AlternativeProps) => {
  return (
    <div className="w-max flex bg-secondary rounded-lg">
      {options.map((option) => (
        <div
          key={option.value}
          className={cn(
            "w-max text-center rounded-lg px-3 transition-all cursor-pointer",
            active === option.value && "px-6 bg-ttertiary"
          )}
          onClick={() => onActive(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

const SortInfoSelect = ({ sortInfo, handleSubmit, handleCancel }) => {
  const [field, setField] = useState(sortInfo.field);
  const [order, setOrder] = useState(sortInfo.order);

  const onCancel = () => {
    handleCancel();
  };

  const onSubmit = useCallback(() => {
    handleSubmit({
      field,
      order,
    });
  }, [field, order]);
  return (
    <div className="flex flex-col w-auto bg-secondary gap-4 rounded p-4 border">
      <div className="flex gap-2">
        <p className="min-w-12 text-right">field:</p>
        <Alternative
          options={[
            { label: "created", value: "created" },
            { label: "updated", value: "updated" },
          ]}
          active={field}
          onActive={(value) => setField(value)}
        />
      </div>
      <div className="flex gap-2">
        <p className="min-w-12 text-right">order:</p>

        <Alternative
          options={[
            { label: "asc", value: "asc" },
            { label: "desc", value: "desc" },
          ]}
          active={order}
          onActive={(value) => setOrder(value)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel}>cancel</button>
        <button onClick={onSubmit}>ok</button>
      </div>
    </div>
  );
};

const sort = ({ sortInfo, setSortInfo }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onOpenChange = (flag) => {
    startTransition(() => {
      setOpen(flag);
    });
  };

  const handleSubmit = (newSortInfo) => {
    setSortInfo(newSortInfo);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <ArrowUpDown
          className="cursor-pointer"
          size={20}
          onClick={() => setOpen((v) => !v)}
        />
      </PopoverTrigger>
      <PopoverContent sideOffset={12} className="z-10">
        <SortInfoSelect
          sortInfo={sortInfo}
          handleSubmit={handleSubmit}
          handleCancel={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default sort;
