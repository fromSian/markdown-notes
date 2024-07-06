import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  DetailsHTMLAttributes,
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";

interface CollaspeProps {
  expandedIds: (string | number)[];
  setExpandedIds: Dispatch<SetStateAction<(string | number)[]>>;
  children?: ReactNode;
}

const Context = createContext<{
  expandedIds: (string | number)[];
  setExpandedIds: Dispatch<SetStateAction<(string | number)[]>>;
}>({
  expandedIds: [],
  setExpandedIds: () => {},
});

const Collaspe = ({ expandedIds, setExpandedIds, children }: CollaspeProps) => {
  return (
    <Context.Provider value={{ expandedIds, setExpandedIds }}>
      {children}
    </Context.Provider>
  );
};

interface CollaspeItemProps {
  index: number;
  value: string | number;
  HeaderItem: (props: DetailsHTMLAttributes<HTMLDivElement>) => ReactNode;
  ContentItem: () => ReactNode;
  className?: string;
  headerWrapClassName?: string;
  contentWrapClassName?: string;
}

const CollaspeItemHeader = ({ value, HeaderItem, headerWrapClassName }) => {
  const { expandedIds, setExpandedIds } = useContext(Context);
  const ref = useRef();
  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-between cursor-pointer text-sm italic",
        headerWrapClassName
      )}
      onClick={(e) => {
        setExpandedIds((v) => {
          if (expandedIds.includes(value)) {
            ref.current.setAttribute("data-state", false);
            return v.filter((item) => item != value);
          }
          ref.current.setAttribute("data-state", true);
          return [...v, value];
        });
      }}
    >
      <HeaderItem />
      <ChevronDown
        size={16}
        className={cn(
          "transition-all",
          expandedIds.includes(value) ? "rotate-180" : "rotate-0"
        )}
      />
    </div>
  );
};
const CollaspeItem = ({
  value,
  ContentItem,
  className,
  contentWrapClassName,
}: CollaspeItemProps) => {
  return (
    // <div className={cn("px-2", className)}>
    //   <div
    //     className={cn(
    //       "grid transition-all duration-500",
    //       isExpanded
    //         ? "grid-rows-[1fr] opacity-100"
    //         : "grid-rows-[0fr] opacity-0"
    //     )}
    //   >
    //     <div className={cn("overflow-hidden", contentWrapClassName)}>
    //       <ContentItemNode />
    //     </div>
    //   </div>
    // </div>
    <div className={cn("px-2", className)}>
      <div
        className={cn(
          "grid transition-all duration-500",
          "group-data-[state=true]:grid-rows-[1fr] group-data-[state=true]:opacity-100",
          "group-data-[state=false]:grid-rows-[0fr] group-data-[state=false]:opacity-0"
        )}
      >
        <div className={cn("overflow-hidden", contentWrapClassName)}>
          <ContentItem />
        </div>
      </div>
    </div>
  );
};

export { Collaspe, CollaspeItem, CollaspeItemHeader };

import { useState } from "react";

export const Item = forwardRef(({ Content }, ref) => {
  const [open, setOpen] = useState(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        open: open,
        setAllState: (flag) => {
          setOpen(flag);
        },
      };
    },
    [open]
  );

  return (
    <>
      <div onClick={(v) => setOpen((v) => !v)}>this is header</div>
      <div
        className={cn(
          "grid transition-all duration-500",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <Content />
        </div>
      </div>
    </>
  );
});
