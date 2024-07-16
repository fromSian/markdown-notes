import { useAppDispatch } from "@/states/hooks";
import { X } from "lucide-react";
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
import Status from "./item/Status";
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
    const [status, setStatus] = useState<
      "loading" | "success" | "fail" | undefined
    >(undefined);

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
        setStatus("loading");

        const content = ref.current?.getHTMLValue();
        const summary = ref.current?.getTextValue();

        await onNewSubmit(content, summary);
        setStatus("success");
        setAdding(false);
      } catch (error) {
        setStatus("fail");

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
        <div className="flex justify-between items-center">
          <p className="text-ttertiary text-sm px-1 bg-secondary flex items-center rounded-md h-max">
            new item
          </p>

          <div
            className="flex gap-2 justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              onClick={onCancel}
              className="group cursor-pointer px-2 rounded-sm text-center flex items-center bg-secondary border border-transparent hover:border-border hover:bg-transparent py-1"
            >
              <X
                size={16}
                className={
                  "text-ttertiary group-hover:text-tprimary group-active:scale-95 transition-all"
                }
              />
            </div>
            <Status status={status} isChanged={true} handleSave={onSubmit} />
          </div>
        </div>
        <Editor content={""} ref={ref} />

        {loading && <MaskLoader loading={loading} />}
      </div>
    );
  }
);

export default NewEditor;
