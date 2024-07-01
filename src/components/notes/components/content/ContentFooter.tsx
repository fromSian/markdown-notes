import ContentExport from "./ContentExport";
import ContentNewTriggle from "./ContentNewTriggle";
const ContentFooter = ({ handleAddNew }) => {
  return (
    <div className="flex justify-between pr-4 items-center">
      <ContentNewTriggle onClick={handleAddNew} />
      <ContentExport />
    </div>
  );
};

export default ContentFooter;
