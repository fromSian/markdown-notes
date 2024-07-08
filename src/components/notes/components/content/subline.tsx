import { ArrowUpDown, Loader } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface SublineProps {
  updated: string;
  created: string;
  count: number;
  desc: boolean;
  setDesc: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const Subline = ({
  updated,
  created,
  count,
  desc,
  setDesc,
  loading,
}: SublineProps) => {
  const changeDesc = () => {
    setDesc((v) => !v);
  };

  return (
    <>
      <div className="flex gap-4 text-xs text-ttertiary mb-4">
        {loading ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <>
            {updated && <p>{updated}</p>}
            {created && <p>{created}</p>}
            <p>{count || 0} items</p>
            <button className="flex gap-1" onClick={changeDesc}>
              {desc ? "desc" : "asc"} <ArrowUpDown size={16} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Subline;
