import { ChangeEvent, FocusEvent, useCallback, useState } from "react";
interface ContentTitleProps {
  id: string | number;
  initialValue: string;
  onSave: (text: string) => void;
}

const Title = ({ id, initialValue, onSave }: ContentTitleProps) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

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
        className="resize-none text-2xl w-full field overflow-hidden focus-visible:outline-none bg-transparent"
        rows={1}
        onChange={onChange}
        maxLength={100}
        onBlur={onBlur}
      />
      <div className="bg-current w-48 h-[0.1rem] mb-2 opacity-60"></div>
    </>
  );
};

export default Title;
