import { EditorEvents } from "@tiptap/react";
import { forwardRef } from "react";
import Editor from "../editor";

interface ContentEditorProps {
  id: string | number;
  content: string;
  onUpdate: (event: EditorEvents["update"]) => void;
}
const ContentEditor = forwardRef(
  ({ id, content, onUpdate }: ContentEditorProps, ref) => {
    return (
      <div className="relative">
        <Editor content={content} ref={ref} onUpdate={onUpdate} />
      </div>
    );
  }
);

export default ContentEditor;
