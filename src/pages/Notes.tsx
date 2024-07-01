import Main from "@/components/notes/Main";
import NavigationPanel from "@/components/notes/NavigationPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import * as UIVariable from "@/lib/ui";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { createContext, useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

const initialPanelSize = {
  navigation: 20,
  main: 65,
  chapters: 15,
};

export const Context = createContext({
  showChapters: true,
  activeNavigationIndex: 0,
  activeChapterIndex: 0,
  setActiveChapterIndex: (index: number) => {},
  setActiveNavigationIndex: (index: number) => {},
});

const Notes = () => {
  const { headerExpanded, showNavigation, showChapters } = useAppSelector(
    (state) => state.ui
  );

  const navigationRef = useRef<ImperativePanelHandle>(null);

  const dispatch = useAppDispatch();

  /**
   * finish this
   * and change the uistate using the useContext
   *
   */
  const [activeChapterIndex, setActiveChapterIndex] = useState(-1);
  const [activeNavigationIndex, setActiveNavigationIndex] = useState(0);

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

  return (
    <>
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
          maxSize={30}
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
        <ResizablePanel order={2}>
          <Main />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Notes;
