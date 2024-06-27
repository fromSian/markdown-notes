interface NoteDateProps {
  created: string;
  updated: string;
}

const NoteDate = ({ created, updated }: NoteDateProps) => {
  return (
    <p className="text-ttertiary text-xs mb-4">
      {updated}
      <span className="opacity-70 ml-2">{created}</span>
    </p>
  );
};

export default NoteDate;
