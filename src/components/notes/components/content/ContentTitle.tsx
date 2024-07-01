import { useState } from "react";

interface ContentTitleProps {
  onNext: () => boolean;
  initialValue: string;
}

const ContentTitle = ({ onNext, initialValue }: ContentTitleProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <textarea
        value={value}
        className="resize-none text-xl w-full field overflow-hidden focus-visible:outline-none pr-4"
        rows={1}
        onChange={(e) => {
          setValue(e.target.value);
          e.target.style.height = "0px";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        maxLength={50}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLTextAreaElement;
            const value = target.value;
            let splits = value.split("\n");
            const length = splits.length - 1;
            if (length) {
              splits = splits.filter((v) => v);
              target.value = splits.slice(0, splits.length).join("\n");

              const flag = onNext();
              if (flag) {
                target.blur();
              }
            }
            // go to next one textarea
          }
        }}
        onBlur={(e) => {
          setValue(e.target.value);
          e.target.style.height = "0px";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
      <div className="bg-current w-48 h-[0.1rem] mb-2 opacity-60"></div>
    </>
  );
};

export default ContentTitle;
