import { memo, MutableRefObject } from "react";
import Item from "./item";

interface ItemsProps {
  datas: any[];
  contentRefs: MutableRefObject<HTMLDivElement[]>;
}

const Items = memo(({ datas, contentRefs }: ItemsProps) => {
  return datas.map((item, index) => {
    return (
      <Item
        index={index}
        key={item.id}
        item={item}
        ref={(element: HTMLDivElement) =>
          (contentRefs.current[index] = element)
        }
      />
    );
  });
});

export default Items;
