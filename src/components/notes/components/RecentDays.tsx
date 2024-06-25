interface RecentDaysProps {
  message: string;
}

const RecentDays = ({ message }: RecentDaysProps) => {
  return (
    <p className="text-ttertiary px-2 border-b mb-2 py-1 truncate">{message}</p>
  );
};

export default RecentDays;
