import GrowTextarea from "@/components/common/GrowTextarea";
import { useRef, useState } from "react";

interface ContentTitleProps {
  onNext: () => void;
  initialValue: string;
}

const ContentTitle = ({ onNext, initialValue }: ContentTitleProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState(initialValue);

  return (
    <div>
      <GrowTextarea
        ref={textareaRef}
        wrapClassName="text-3xl font-bold"
        className="text-2xl font-bold"
        rows={1}
        maxLength={50}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
      <div className="bg-current w-48 h-[0.1rem] my-2 opacity-60"></div>
    </div>
  );
};

export default ContentTitle;
