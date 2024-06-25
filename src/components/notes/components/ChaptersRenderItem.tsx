import { memo } from "react";

const colors = ["#C7C23860", "#66BA0060", "#DE202060", "#5B63B760"];

const status = ["new", "saved", "unsaved", "nochanges"];

interface ChaptersRenderItemProps {
  index: number;
}

const ChaptersRenderItem = memo(({ index }: ChaptersRenderItemProps) => {
  return (
    <div
      className="min-h-[2rem] mb-2 flex items-center px-1 gap-1"
      style={{
        backgroundColor: colors[index % colors.length],
      }}
    >
      <p className="text-tsecondary flex-shrink-0 w-[4rem] text-center truncate text-xs italic">
        {status[index % colors.length] || "default"}
      </p>

      <p className="text-ttertiary truncate">
        I want to go out, and never come back.
      </p>
    </div>
  );
});

export default ChaptersRenderItem;
