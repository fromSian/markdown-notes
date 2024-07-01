import { Frown } from "lucide-react";

interface EmptyProps {
  className?: string;
  message?: string;
}

const Empty = ({ className, message }: EmptyProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full absolute top-[50%] -translate-y-3/4 text-ttertiary ${
        className || ""
      }`}
    >
      <Frown size={28} />
      <p className="italic">{message || "No data found"}</p>
    </div>
  );
};

export default Empty;
