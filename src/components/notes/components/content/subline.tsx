import { getDateTimeInCurrentTimeZone } from "@/lib/timezone";
import { Loader } from "lucide-react";

interface SublineProps {
  updated: string;
  created: string;
  count: number;
  loading: boolean;
}

const Subline = ({ updated, created, count, loading }: SublineProps) => {
  return (
    <>
      <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 text-xs text-ttertiary mb-4 transition-all">
        {loading ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <>
            {updated && (
              <p className="truncate">
                {getDateTimeInCurrentTimeZone(updated)}
              </p>
            )}
            {created && (
              <p className="truncate">
                {getDateTimeInCurrentTimeZone(created)}
              </p>
            )}
            <p className="truncate">{count || 0} items</p>
          </>
        )}
      </div>
    </>
  );
};

export default Subline;
