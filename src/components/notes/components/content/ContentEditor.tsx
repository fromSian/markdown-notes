import Placeholder from "@tiptap/extension-placeholder";
import {
  EditorProvider,
  FocusPosition,
  SingleCommands,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MutableRefObject, forwardRef, memo, useImperativeHandle } from "react";
import NoteDate from "./NoteDate";

const FocusHandler = forwardRef((props, ref) => {
  const { editor } = useCurrentEditor();
  useImperativeHandle(ref, () => {
    return {
      focus(position: FocusPosition = "start") {
        editor?.commands.focus(position);
      },
    };
  });
  return <></>;
});

const extensions = [
  Placeholder.configure({
    placeholder: "Write something …",
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
];

interface ContentEditorProps {
  id: string | number;
  index: number;
  content?: string;
  created: string;
  updated: string;
  onSave: (text: string) => void;
  editorRef?: MutableRefObject<SingleCommands | undefined>;
}
const ContentEditor = memo(
  ({
    id,
    created,
    updated,
    editorRef,
    index,
    onSave,
    content = "",
  }: ContentEditorProps) => {
    return (
      <>
        <EditorProvider
          onBlur={({ editor, transaction }) => {
            onSave(editor.getHTML());
          }}
          extensions={extensions}
          content={content}
          editorProps={{
            attributes: {
              class: "prose-sm dark:prose-invert sm:prose focus:outline-none",
            },
          }}
        >
          <FocusHandler ref={editorRef} />
        </EditorProvider>
        <div className="divider w-full border my-2"></div>
        <div className="opacity-50">
          <NoteDate updated={updated || "-"} created={created || "-"} />
        </div>
      </>
    );
  }
);

export default ContentEditor;
