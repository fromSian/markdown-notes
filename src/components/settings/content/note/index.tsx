import { sortOptions } from "@/components/notes/components/content/operator/sort";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import {
  updateDefaultExpanded,
  updateShowExactTime,
  updateSortInfo,
} from "@/states/note.slice";
import { AppThunkDispatch } from "@/states/store";
import { SortInfo } from "@/types/notes";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const Note = () => {
  const { defaultExpanded, showExactTime, sortInfo } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch<AppThunkDispatch>();

  const setDefaultExpanded = (value: boolean) => {
    dispatch(updateDefaultExpanded({ value }));
  };
  const setShowExactTime = (value: boolean) => {
    dispatch(updateShowExactTime({ value }));
  };
  const setSortInfo = (value: string) => {
    dispatch(
      updateSortInfo({ value } as {
        value: SortInfo;
      })
    );
  };
  return (
    <>
      <div className="divider italic my-4">note</div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit title={"expanded"} info={"expanded"} />
          <Switch
            checked={defaultExpanded}
            onCheckedChange={setDefaultExpanded}
          />
        </div>
        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit title={"show time"} info={"show time"} />
          <Switch checked={showExactTime} onCheckedChange={setShowExactTime} />
        </div>
        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit title={"sort info"} info={"sort info"} />
          <SelectValue
            value={sortInfo}
            setValue={setSortInfo}
            items={sortOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Note;
