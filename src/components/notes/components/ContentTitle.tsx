import GrowTextarea from "@/components/common/GrowTextarea";
import { useRef } from "react";

const ContentTitle = ({ onNext }: { onNext: () => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <GrowTextarea
        ref={textareaRef}
        wrapClassName="text-3xl font-bold"
        className="text-2xl font-bold border"
        rows={1}
        maxLength={50}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const splits = (e.target as HTMLTextAreaElement).value.split("\n");
            const length = splits.length - 1;
            if (length) {
              (e.target as HTMLTextAreaElement).value = splits
                .slice(0, length)
                .join("\n");
              (e.target as HTMLTextAreaElement).blur();
              onNext();
            }
            // go to next one textarea
          }
        }}
      />
    </div>
  );
};

export default ContentTitle;
