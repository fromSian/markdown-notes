import ChaptersPanel from "@/components/notes/ChaptersPanel";
import MainContent from "@/components/notes/MainContent";
import NavigationPanel from "@/components/notes/NavigationPanel";
import * as UIVariable from "@/lib/ui";
import { useAppSelector } from "@/states/hooks";
const Notes = () => {
  const { headerExpanded } = useAppSelector((state) => state.ui);
  return (
    <div
      className="flex transition-all"
      style={{
        height: headerExpanded
          ? `calc(100vh - ${UIVariable.headerHeight})`
          : "100vh",
      }}
    >
      <NavigationPanel />
      <MainContent />
      <ChaptersPanel />
    </div>
  );
};

export default Notes;
