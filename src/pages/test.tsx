import { useState } from "react";

const test = () => {
  const [date, setDate] = useState(0);

  return (
    <div>
      <button
        className="sticky top-0 bg-red-200 w-full"
        onClick={() => setDate((v) => v + 1)}
      >
        add
      </button>
    </div>
  );
};

export default test;
