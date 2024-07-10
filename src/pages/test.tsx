import NewEditor from "@/components/notes/components/content/NewEditor";
import { useState } from "react";
import Highlighter from "react-highlight-words";

const test = () => {
  const [date, setDate] = useState(0);

  return (
    <div>
      <NewEditor />
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight="<b>The</b> dog is chasing the cat. Or perhaps they're just playing?"
      />
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
