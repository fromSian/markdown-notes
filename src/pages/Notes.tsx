import ChaptersPanel from "@/components/notes/ChaptersPanel";
import MainContent from "@/components/notes/MainContent";
import NavigationPanel from "@/components/notes/NavigationPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import * as UIVariable from "@/lib/ui";
import { useAppSelector } from "@/states/hooks";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
const Notes = () => {
  const { headerExpanded, showNavigation, showChapters } = useAppSelector(
    (state) => state.ui
  );

  const navigationRef = useRef<ImperativePanelHandle>(null);
  const chaptersRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    if (navigationRef.current) {
      showNavigation
        ? navigationRef.current?.expand()
        : navigationRef.current?.collapse();
    }
  }, [showNavigation]);

  useEffect(() => {
    if (chaptersRef.current) {
      showChapters
        ? chaptersRef.current?.expand()
        : chaptersRef.current?.collapse();
    }
  }, [showChapters]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex transition-all"
      style={{
        height: headerExpanded
          ? `calc(100vh - ${UIVariable.headerHeight})`
          : "100vh",
      }}
    >
      <ResizablePanel
        order={1}
        ref={navigationRef}
        collapsible={true}
        defaultSize={25}
        className="transition-[flex]"
      >
        <NavigationPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        defaultSize={80}
        minSize={20}
        className="transition-[flex]"
      >
        <MainContent />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={3}
        ref={chaptersRef}
        defaultSize={15}
        minSize={2}
        collapsedSize={2}
        collapsible={true}
        className="transition-[flex]"
      >
        <ChaptersPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Notes;
