import { useState } from "react";

interface ContentTitleProps {
  onNext: () => void;
  initialValue: string;
}

const ContentTitle = ({ onNext, initialValue }: ContentTitleProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div>
      <textarea
        value={value}
        className="resize-none text-xl w-full field overflow-hidden focus-visible:outline-none"
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
            const splits = value.split("\n");
            const length = splits.length - 1;
            if (length) {
              target.value = splits.slice(0, length + 1).join("\n");
              target.blur();
              onNext();
            }
            // go to next one textarea
          }
        }}
      />
      <div className="bg-current w-48 h-[0.1rem] mb-2 opacity-60"></div>
    </div>
  );
};

export default ContentTitle;
