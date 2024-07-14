import Header from "@/components/header/Header";
import Content from "@/components/notes/Content";
import Navigation from "@/components/notes/Navigation";
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
  navigation: 18,
  content: 82,
};

const Notes = () => {
  const { headerExpanded, showNavigation } = useAppSelector(
    (state) => state.ui
  );

  const navigationRef = useRef<ImperativePanelHandle>(null);

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

  return (
    <>
      <Header />
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
          maxSize={60}
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
          <Navigation />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel order={2} defaultSize={initialPanelSize.content}>
          <Content />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Notes;
