import TooltipSimple from "@/components/ui/TooltipSimple";
import { useAppDispatch } from "@/states/hooks";
import { addOneNoteItem } from "@/states/noteItem.slice";
import { Check, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import Editor from "./Editor";
import MaskLoader from "./MaskLoader";

interface NewEditorProps {}
const NewEditor = forwardRef(({ onExistAddNew }, ref) => {
  const [loading, setLoading] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(parentRef.current);
    if (parentRef.current) {
      parentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const onSubmit = () => {
    if (!ref?.current) {
      return;
    }
    setLoading(true);

    const value = ref.current?.getHTMLValue();
    setTimeout(async () => {
      await dispatch(addOneNoteItem());
      setLoading(false);
      onExistAddNew();
      console.log(value);
    }, 2000);
  };
  const onCancel = () => {
    onExistAddNew();
  };

  const focusEditor = () => {
    if (!ref?.current) {
      return;
    }
    ref.current.focus("end");
  };

  return (
    <div
      ref={parentRef}
      onClick={focusEditor}
      className="border-t-2 ml-4 pb-8 min-h-32 relative pt-2"
    >
      <p
        className="italic px-4 absolute bg-blue-800 rounded-full text-ttertiary"
        style={{
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
      >
        new item
      </p>
      <Editor content={""} ref={ref} />
      <div
        className="absolute bottom-0 left-0 w-full bg-secondary flex gap-8 justify-center"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <TooltipSimple content="cancel">
          <X
            onClick={onCancel}
            className="hover:text-red-300 cursor-pointer active:scale-90 transition-all"
          />
        </TooltipSimple>
        <TooltipSimple content="save">
          <Check
            onClick={onSubmit}
            className="hover:text-green-300 cursor-pointer active:scale-90 transition-all"
          />
        </TooltipSimple>
      </div>

      {loading && <MaskLoader loading={loading} />}
    </div>
  );
});

export default NewEditor;
