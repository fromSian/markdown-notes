import { Loader } from "lucide-react";
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
interface ContentTitleProps {
  id: string | number;
  initialValue: string;
  updated: string;
  created: string;
  count: number;
  onNext: () => boolean | undefined;
  onSave: (text: string) => void;
}

const ContentTitle = ({
  id,
  updated,
  created,
  count,
  initialValue,
  onNext,
  onSave,
}: ContentTitleProps) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLTextAreaElement;
      const value = target.value;
      let splits = value.split("\n");
      const length = splits.length - 1;
      if (length) {
        splits = splits.filter((v) => v);
        target.value = splits.slice(0, splits.length).join("\n");

        const flag = onNext();
        console.log(flag);
        if (flag) {
          target.blur();
        }
      }
    }
  };
  const onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <textarea
        value={value}
        className="resize-none text-xl w-full field overflow-hidden focus-visible:outline-none pr-4 bg-transparent"
        rows={1}
        onChange={onChange}
        maxLength={50}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <div className="bg-current w-48 h-[0.1rem] mb-2 opacity-60"></div>
      <div className="flex gap-4 text-xs text-ttertiary mb-4">
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            {updated && <p>{updated}</p>}
            {created && <p>{created}</p>}
            <p>{count || 0} items</p>
          </>
        )}
      </div>
    </>
  );
};

export default ContentTitle;
