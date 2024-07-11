import TooltipSimple from "@/components/ui/TooltipSimple";
import { useAppDispatch } from "@/states/hooks";
import { Check, X } from "lucide-react";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Editor from "./Editor";
import MaskLoader from "./MaskLoader";

interface NewEditorProps {
  setAdding: Dispatch<SetStateAction<boolean>>;
  onNewSubmit: (content: string, summary: string) => void;
}
const NewEditor = forwardRef(
  ({ setAdding, onNewSubmit }: NewEditorProps, ref) => {
    const [loading, setLoading] = useState(false);
    const parentRef = useRef<HTMLDivElement>(null);
    const [isPending, startTransition] = useTransition();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (parentRef.current) {
        parentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, []);

    const onSubmit = async () => {
      if (!ref?.current) {
        return;
      }

      try {
        setLoading(true);

        const content = ref.current?.getHTMLValue();
        const summary = ref.current?.getTextValue();

        await onNewSubmit(content, summary);
        startTransition(() => {
          setLoading(false);
          setAdding(false);
        });
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    const onCancel = () => {
      setAdding(false);
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
        className="pb-8 min-h-32 relative pt-2 mb-4"
      >
        <p className="divider">new item</p>
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
  }
);

export default NewEditor;
