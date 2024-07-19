import { cn } from "@/lib/utils";
import { NoteContentItemType } from "@/types/notes";
import { FocusPosition } from "@tiptap/react";
import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { EditorRef } from "../editor";
import ContentEditor from "./content-editor";
import ItemHeader from "./item-header";

interface ItemProps {
  index: number;
  item: NoteContentItemType;
  sortField: "updated" | "created";
  handleDelete: (id: string | number) => void;
  handleSave: (id: string | number, content: string, summary: string) => void;
  defaultExpanded: boolean;
  showExactTime: boolean;
}

export type ItemRef = {
  open: boolean;
  setAllState: (flag: boolean) => void;
  focus: (position: FocusPosition) => void;
};
const Item = memo(
  forwardRef(
    (
      {
        index,
        item,
        sortField,
        handleDelete,
        handleSave,
        defaultExpanded,
        showExactTime,
      }: ItemProps,
      ref
    ) => {
      const [open, setOpen] = useState(defaultExpanded);
      const [status, setStatus] = useState<
        "loading" | "success" | "fail" | undefined
      >();
      const [isChanged, setIsChanged] = useState(false);
      const editorRef = useRef<EditorRef>();

      useImperativeHandle(
        ref,
        () => {
          return {
            open: open,
            setAllState: (flag: boolean) => {
              setOpen(flag);
            },
            focus: (position: FocusPosition) => {
              editorRef.current?.focus(position);
            },
          };
        },
        [open]
      );

      const toggleOpen = () => {
        setOpen((v) => !v);
      };

      const onSave = async () => {
        setStatus("loading");
        if (!editorRef.current) {
          return;
        }
        try {
          const content = editorRef.current?.getHTMLValue();
          const summary = editorRef.current?.getTextValue();
          await handleSave(item.id, content, summary);
          setStatus("success");
          setIsChanged(false);
        } catch (error) {
          console.log(error);
          setStatus("fail");
          setIsChanged(false);
        }
      };

      const onEditorUpdate = () => {
        setStatus(undefined);
        setIsChanged(true);
      };

      return (
        <div>
          <ItemHeader
            toggleOpen={toggleOpen}
            open={open}
            index={index}
            id={item.id}
            summary={item.summary}
            updated={item.updated}
            created={item.created}
            sortField={sortField}
            showExactTime={showExactTime}
            status={status}
            isChanged={isChanged}
            handleSave={onSave}
            handleDelete={handleDelete}
          />
          <div
            className={cn(
              "grid transition-all duration-500",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <ContentEditor
                id={item?.id}
                content={item?.content}
                onUpdate={onEditorUpdate}
                ref={editorRef}
              />
            </div>
          </div>
        </div>
      );
    }
  )
);

export default Item;
