import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
interface ContentTitleProps {
  id: string | number;
  initialValue: string;
  handleSave: (id: string | number, text: string) => void;
}

const Title = ({ id, initialValue, handleSave }: ContentTitleProps) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [id, initialValue]);

  const onBlur = useCallback(
    async (e: FocusEvent<HTMLTextAreaElement>) => {
      if (!isChanged) {
        return;
      }

      setValue(e.target.value);
      const text = e.target.value;
      e.target.style.height = "0px";
      e.target.style.height = e.target.scrollHeight + "px";
      setLoading(true);
      await handleSave(id, text);
      setLoading(false);
      setIsChanged(false);
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
      <div className="bg-current w-[40%] h-[0.1rem] mb-2 opacity-60"></div>
    </>
  );
};

export default Title;
