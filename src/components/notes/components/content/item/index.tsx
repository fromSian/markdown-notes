import { getDateTimeInCurrentTimeZone } from "@/lib/timezone";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/states/hooks";
import { FocusPosition } from "@tiptap/react";
import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import ContentEditor from "./ContentEditor";
import ItemHeader from "./ItemHeader";

interface ItemProps {
  index: number;
  item: any;
}

const Item = memo(
  forwardRef(({ index, item, handleDelete, handleSave }: ItemProps, ref) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState<
      "loading" | "success" | "fail" | undefined
    >();
    const [isChanged, setIsChanged] = useState(false);
    const editorRef = useRef();

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
          getHTMLValue: () => {
            return editorRef.current?.getHTMLValue();
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
        handleSave(item.id, content, summary);
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
        <div className="w-full h-0.5 bg-border my-2" />
        <div className="flex flex-col xs:flex-row justify-between gap-2 text-xs text-ttertiary">
          <p className="truncate">
            created: {getDateTimeInCurrentTimeZone(item?.created) || "-"}
          </p>

          <p className="truncate">
            updated: {getDateTimeInCurrentTimeZone(item?.updated) || "-"}
          </p>
        </div>
      </div>
    );
  })
);

export default Item;
