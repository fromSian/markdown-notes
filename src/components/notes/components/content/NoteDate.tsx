import { ReactNode } from "react";

interface NoteDateProps {
  created: string;
  updated: string;
  extra?: ReactNode;
}

const NoteDate = ({ created, updated, extra }: NoteDateProps) => {
  return (
    <p className="text-ttertiary text-xs mb-4">
      {updated}
      <span className="opacity-70 ml-2">{created}</span>
      {extra}
    </p>
  );
};

export default NoteDate;
