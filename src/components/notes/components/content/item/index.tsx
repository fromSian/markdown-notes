import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/states/hooks";
import { FocusPosition } from "@tiptap/react";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ContentEditor from "./ContentEditor";
import ItemHeader from "./ItemHeader";

interface ItemProps {
  index: number;
  item: any;
}

const Item = memo(
  forwardRef(({ index, item }: ItemProps, ref) => {
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
    useEffect(() => {
      // console.log(index, "setAllState");
    }, []);

    const toggleOpen = () => {
      setOpen((v) => !v);
    };

    const handleSave = () => {
      setStatus("loading");
      setTimeout(() => {
        const flag = Math.random() > 0.9;
        setStatus(flag ? "success" : "fail");
        setIsChanged(false);
      }, 2000);
    };

    const onEditorUpdate = () => {
      setStatus(undefined);
      setIsChanged(true);
    };

    const handleDelete = async () => {};

    return (
      <div>
        <ItemHeader
          toggleOpen={toggleOpen}
          open={open}
          index={index}
          summary={item.summary}
          status={status}
          isChanged={isChanged}
          handleSave={handleSave}
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
        <div className="flex justify-between gap-2 text-xs text-ttertiary">
          <span>
            {item?.created || "-"} {item?.updated || "-"}
          </span>
        </div>
      </div>
    );
  })
);

export default Item;
