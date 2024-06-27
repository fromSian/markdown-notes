import Placeholder from "@tiptap/extension-placeholder";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { memo, useEffect } from "react";
import NoteDate from "./NoteDate";

const FocusHandler = memo(({ focus }: { focus: boolean }) => {
  const { editor } = useCurrentEditor();
  useEffect(() => {
    if (focus) {
      editor?.commands.focus("end");
    }
  }, [focus]);
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
  autoFocus?: boolean;
  content?: string;
  onSave: (text: string) => void;
}
const ContentEditor = memo(
  ({ onSave, autoFocus = false, content = "" }: ContentEditorProps) => {
    return (
      <div>
        <EditorProvider
          onBlur={({ editor, transaction }) => {
            // save if blank then delete this part
            //   console.log(editor);
            //   console.log(editor.getText());
            console.log(
              editor.getText(),
              editor.getHTML(),
              editor.getJSON(),
              editor.getText({ blockSeparator: "\n" })
            );
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
          <FocusHandler focus={autoFocus} />
        </EditorProvider>
        <div className="divider w-full border my-2"></div>
        <p className="mb-6 opacity-50">
          <NoteDate updated="2018-4-3" created="2014-3-2" />
        </p>
      </div>
    );
  }
);

export default ContentEditor;
