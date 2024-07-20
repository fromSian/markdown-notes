import Content from "@/components/notes/content";
import Header from "@/components/notes/header";
import Navigation from "@/components/notes/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

const initialPanelSize = {
  navigation: 18,
  content: 82,
};

const Notes = () => {
  const [showNavigation, setShowNavigation] = useState(true);

  const { activeId } = useAppSelector((state) => state.note);
  const navigationRef = useRef<ImperativePanelHandle>(null);

  const dispatch = useAppDispatch();
  const prevSizeRef = useRef<number>(initialPanelSize.navigation);

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
    if (!activeId) {
      navigationRef.current?.resize(100);
    } else {
      navigationRef.current?.resize(
        prevSizeRef.current < 100
          ? prevSizeRef.current
          : initialPanelSize.navigation
      );
    }
  }, [activeId, showNavigation]);

  return (
    <>
      <Header
        showNavigation={showNavigation}
        setShowNavigation={setShowNavigation}
        activeId={activeId}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex transition-all"
        style={{
          height: `calc(100vh - 4rem)`,
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
            setShowNavigation(false);
          }}
          onExpand={() => {
            setShowNavigation(true);
          }}
          onResize={(e) => {
            prevSizeRef.current = e;
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
