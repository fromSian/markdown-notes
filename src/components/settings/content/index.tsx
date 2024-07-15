import Account from "./account";
import Note from "./note";
import System from "./system";

const Content = () => {
  return (
    <div className="p-4">
      <Account />
      <Note />
      <System />
    </div>
  );
};

export default Content;
