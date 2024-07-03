import ContentCollapseTriggle from "./ContentCollapseTriggle";
import ContentExport from "./ContentExport";
import ContentNewTriggle from "./ContentNewTriggle";
const ContentFooter = ({ handleAddNew }) => {
  return (
    <div className="flex justify-between pr-4 items-center mt-4">
      <ContentCollapseTriggle />
      <ContentNewTriggle onClick={handleAddNew} />
      <ContentExport />
    </div>
  );
};

export default ContentFooter;
