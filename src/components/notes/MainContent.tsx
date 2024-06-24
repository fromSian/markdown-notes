import * as UIVariable from "@/lib/ui";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
const MainContent = () => {
  const { showNavigation, showChapters, headerDocked, headerExpanded } =
    useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  return (
    <section
      className="bg-blue-900 transition-all h-full"
      style={{
        width: `calc(100vw - ${
          showNavigation ? UIVariable.navigationWidth : "0rem"
        } - ${showChapters ? UIVariable.chaptersWidth : "0rem"})`,
      }}
    ></section>
  );
};

export default MainContent;
