import { Loader } from "lucide-react";

import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
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
  const [isChanged, setIsChanged] = useState(false);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      onNext();
    }
  };
  const onBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      if (!isChanged) {
        return;
      }

      setValue(e.target.value);
      e.target.style.height = "0px";
      e.target.style.height = e.target.scrollHeight + "px";
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsChanged(false);
      }, 2000);
    },
    [isChanged]
  );
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsChanged(true);
    const value = e.target.value;
    const t = value.replace(/\r?\n/g, "");
    e.target.value = t;

    setValue(e.target.value);
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  };
  return (
    <>
      <textarea
        value={value}
        className="resize-none text-xl w-full field overflow-hidden focus-visible:outline-none pr-4 bg-transparent pt-4"
        rows={1}
        onChange={onChange}
        maxLength={50}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <div className="bg-current w-48 h-[0.1rem] mb-2 opacity-60"></div>
      <div className="flex gap-4 text-xs text-ttertiary mb-4">
        {loading ? (
          <Loader size={16} className="animate-spin" />
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
