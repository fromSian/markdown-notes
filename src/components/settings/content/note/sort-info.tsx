import { cn } from "@/lib/utils";

const SortInfo = ({ open }) => {
  return (
    <div
      className={cn(
        "grid transition-all duration-500",
        open
          ? "grid-rows-[1fr] opacity-100 mb-4"
          : "grid-rows-[0fr] opacity-0 mb-0"
      )}
    >
      <div className="overflow-hidden">sor info </div>
    </div>
  );
};

export default SortInfo;
