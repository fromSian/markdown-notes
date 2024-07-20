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
import { useTranslation } from "react-i18next";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const Note = () => {
  const { t } = useTranslation("settings");
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
      <div className="divider italic my-4">{t("part.note")}</div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-2 sm:px-4 gap-2 rounded-md bg-emphasis">
          <TitleKit
            title={t("default-expand.title")}
            info={t("default-expand.description")}
          />
          <Switch
            checked={defaultExpanded}
            onCheckedChange={setDefaultExpanded}
          />
        </div>
        <div className="flex justify-between py-2 px-2 sm:px-4 gap-2 rounded-md bg-emphasis">
          <TitleKit
            title={t("show-exact-time.title")}
            info={t("show-exact-time.description")}
          />
          <Switch checked={showExactTime} onCheckedChange={setShowExactTime} />
        </div>
        <div className="flex justify-between py-2  px-2 sm:px-4 gap-2 rounded-md bg-emphasis">
          <TitleKit
            title={t("sort-info.title")}
            info={t("sort-info.description")}
          />
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
