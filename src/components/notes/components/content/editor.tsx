import { forwardRef, useImperativeHandle, useMemo } from "react";

import Placeholder from "@tiptap/extension-placeholder";
import {
  EditorEvents,
  EditorProvider,
  FocusPosition,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export type EditorRef = {
  focus: (position?: FocusPosition) => void;
  getHTMLValue: () => string;
  getTextValue: () => string;
};
const FocusHandler = forwardRef((props, ref) => {
  const { editor } = useCurrentEditor();
  useImperativeHandle(ref, () => {
    return {
      focus(position: FocusPosition = "start") {
        editor?.commands.focus(position);
      },
      getHTMLValue() {
        return editor?.getHTML();
      },
      getTextValue() {
        return editor?.getText();
      },
    };
  });
  return <></>;
});

const placeholderDict = {
  en: "Write something...",
  "zh-CN": "写下您的想法...",
  "zh-TW": "寫下您的想法...",
};

interface EditorProps {
  content: string;
  onUpdate?: (props: EditorEvents["update"]) => void;
  onBlur?: (props: EditorEvents["blur"]) => void;
}
const Editor = forwardRef(({ content, onBlur, onUpdate }: EditorProps, ref) => {
  const extensions = useMemo(
    () => [
      Placeholder.configure({
        placeholder:
          placeholderDict[
            (localStorage.getItem("i18nextLng") || "en") as
              | "zh-CN"
              | "zh-TW"
              | "en"
          ],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    [localStorage.getItem("i18nextLng")]
  );
  const onBlurEvent = (props: EditorEvents["blur"]) => {
    if (onBlur) onBlur(props);
  };
  const onUpdateEvent = (props: EditorEvents["update"]) => {
    if (onUpdate) onUpdate(props);
  };
  return (
    <EditorProvider
      onBlur={onBlurEvent}
      onUpdate={onUpdateEvent}
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class: "prose-sm dark:prose-invert sm:prose focus:outline-none",
        },
      }}
    >
      <FocusHandler ref={ref} />
    </EditorProvider>
  );
});

export default Editor;
