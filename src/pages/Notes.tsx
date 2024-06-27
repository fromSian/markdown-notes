import ChaptersPanel from "@/components/notes/ChaptersPanel";
import MainContent from "@/components/notes/MainContent";
import NavigationPanel from "@/components/notes/NavigationPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import * as UIVariable from "@/lib/ui";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

const initialPanelSize = {
  navigation: 20,
  main: 65,
  chapters: 15,
};

const Notes = () => {
  const { headerExpanded, showNavigation, showChapters } = useAppSelector(
    (state) => state.ui
  );

  const navigationRef = useRef<ImperativePanelHandle>(null);
  const chaptersRef = useRef<ImperativePanelHandle>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!navigationRef.current) {
      return;
    }

    if (showNavigation && navigationRef.current.isCollapsed()) {
      navigationRef.current?.expand();
    }

    if (!showNavigation && navigationRef.current.isExpanded()) {
      navigationRef.current?.collapse();
    }
  }, [showNavigation]);

  useEffect(() => {
    if (!chaptersRef.current) {
      return;
    }

    if (showChapters && chaptersRef.current.isCollapsed()) {
      chaptersRef.current?.resize(initialPanelSize.chapters);
    }

    if (!showChapters && chaptersRef.current.isExpanded()) {
      chaptersRef.current?.collapse();
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
        defaultSize={initialPanelSize.navigation}
        minSize={2}
        className="transition-[flex]"
        onCollapse={() => {
          dispatch({
            type: "ui/setShowNavigation",
            payload: false,
          });
        }}
        onExpand={() => {
          dispatch({
            type: "ui/setShowNavigation",
            payload: true,
          });
        }}
      >
        <NavigationPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        defaultSize={initialPanelSize.main}
        minSize={20}
        className="transition-[flex]"
      >
        <MainContent />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={3}
        ref={chaptersRef}
        defaultSize={initialPanelSize.chapters}
        minSize={2}
        collapsedSize={1}
        collapsible={true}
        className="transition-[flex]"
        onCollapse={() => {
          console.log(12);
          dispatch({
            type: "ui/setShowChapters",
            payload: false,
          });
        }}
        onExpand={() => {
          dispatch({
            type: "ui/setShowChapters",
            payload: true,
          });
        }}
      >
        <ChaptersPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Notes;
