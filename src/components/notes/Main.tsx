import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { NoteChaptersType } from "@/types/notes";
import { Virtualizer } from "@tanstack/react-virtual";
import { MouseEvent, useEffect, useRef, useState, useTransition } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import ChaptersPanel from "./ChaptersPanel";
import Content from "./Content";
const initialPanelSize = {
  content: 80,
  chapters: 20,
};

const Main = () => {
  const [showChapters, setShowChapters] = useState(true);
  const [chapters, setChapters] = useState<NoteChaptersType>([]);
  const [isPending, startTransition] = useTransition();

  const chaptersRef = useRef<ImperativePanelHandle>(null);
  const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element>>(null);

  useEffect(() => {
    if (!chaptersRef.current) {
      return;
    }

    if (showChapters && chaptersRef.current.isCollapsed()) {
      chaptersRef.current?.expand();
    }

    if (!showChapters && chaptersRef.current.isExpanded()) {
      chaptersRef.current?.collapse();
    }
  }, [showChapters]);

  const toggleChaptersPanel = (event: MouseEvent) => {
    event.stopPropagation();
    startTransition(() => setShowChapters((v) => !v));
  };

  const onChapterClick = (index: number) => {
    startTransition(() => {
      virtualizerRef.current?.scrollToIndex(index, {
        align: "start",
        behavior: "smooth",
      });
    });
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="transition-all">
      <ResizablePanel
        order={1}
        defaultSize={initialPanelSize.content}
        className="transition-[flex]"
      >
        <Content
          toggleChaptersPanel={toggleChaptersPanel}
          showChapters={showChapters}
          virtualizerRef={virtualizerRef}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        minSize={5}
        ref={chaptersRef}
        defaultSize={initialPanelSize.chapters}
        className="transition-[flex]"
        collapsible={true}
        onCollapse={() => {
          setShowChapters(false);
        }}
        onExpand={() => {
          setShowChapters(true);
        }}
      >
        <ChaptersPanel
          onChapterClick={onChapterClick}
          chapters={chapters}
          setChapters={setChapters}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Main;
