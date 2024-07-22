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
import { toast } from "sonner";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const Note = () => {
  const { t } = useTranslation(["settings", "message"]);
  const { defaultExpanded, showExactTime, sortInfo } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch<AppThunkDispatch>();

  const setDefaultExpanded = async (value: boolean) => {
    try {
      await dispatch(updateDefaultExpanded({ value })).unwrap();
      toast.success(t("update-expand-success", { ns: "message" }));
    } catch (error) {
      console.log(error);
    }
  };
  const setShowExactTime = async (value: boolean) => {
    try {
      await dispatch(updateShowExactTime({ value })).unwrap();
      toast.success(t("update-time-success", { ns: "message" }));
    } catch (error) {
      console.log(error);
    }
  };
  const setSortInfo = async (value: string) => {
    try {
      await dispatch(
        updateSortInfo({ value } as {
          value: SortInfo;
        })
      ).unwrap();
      toast.success(t("update-sort-success", { ns: "message" }));
    } catch (error) {
      console.log(error);
    }
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
