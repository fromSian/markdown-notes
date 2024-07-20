import Account from "./account/info";
import Note from "./note";
import System from "./system";

const Content = () => {
  return (
    <div className="p-4 truncate">
      <Account />
      <Note />
      <System />
    </div>
  );
};

export default Content;
