import DeleteConfirm from "@/components/ui/delete-confirm";
import TooltipSimple from "@/components/ui/tooltip-simple";
import {
  formatDistanceFromNow,
  getDateTimeInCurrentTimeZone,
} from "@/lib/timezone";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader, Trash } from "lucide-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import Status from "./status";

const CollaspeTrigger = memo(
  ({ open, toggleOpen }: { open: boolean; toggleOpen: () => void }) => {
    return (
      <div
        onClick={toggleOpen}
        className="group cursor-pointer px-2 rounded-sm text-center flex items-center bg-secondary border border-transparent hover:border-border hover:bg-transparent py-1"
      >
        <ChevronDown
          size={16}
          className={cn(
            "text-ttertiary group-hover:text-tprimary transition-all",
            open && "rotate-180"
          )}
        />
      </div>
    );
  }
);

const DeleteTrigger = memo(
  ({
    id,
    handleDelete,
  }: {
    id: string | number;
    handleDelete: (id: string | number) => void;
  }) => {
    const [loading, setLoading] = useState(false);
    const onDelete = async () => {
      try {
        setLoading(true);
        await handleDelete(id);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    return loading ? (
      <Loader className="animate-spin text-ttertiary" size={16} />
    ) : (
      <DeleteConfirm
        handleDelete={onDelete}
        content={
          <div className="group cursor-pointer px-2 rounded-sm text-center flex items-center bg-secondary border border-transparent hover:border-border hover:bg-transparent py-1">
            <Trash
              size={16}
              className="text-ttertiary group-hover:text-tprimary group-active:scale-95 transition-all"
            />
          </div>
        }
      />
    );
  }
);

const HeaderText = memo(
  ({
    index,
    summary,
    open,
    updated,
    created,
    showExactTime,
    sortField = "updated",
  }: {
    index: number;
    summary: string;
    open: boolean;
    updated: string;
    created: string;
    showExactTime: boolean;
    sortField?: "updated" | "created";
  }) => {
    const { t } = useTranslation("note");
    return (
      <div className="flex gap-2 items-center flex-1 overflow-hidden whitespace-nowrap">
        <p className="italic w-4 flex-shrink-0">{index + 1}.</p>

        <TooltipSimple
          content={
            <>
              <p className="flex justify-between gap-2">
                <span>{t("updated-at")}: </span>
                <span>{getDateTimeInCurrentTimeZone(updated)}</span>
              </p>
              <p className="flex justify-between gap-2">
                <span>{t("created-at")}:</span>
                <span>{getDateTimeInCurrentTimeZone(created)}</span>
              </p>
            </>
          }
        >
          <p className="bg-secondary px-1 rounded-md align-middle text-ttertiary flex-shrink-0">
            {showExactTime
              ? getDateTimeInCurrentTimeZone(
                  sortField === "created" ? created : updated
                )
              : formatDistanceFromNow(
                  sortField === "created" ? created : updated,
                  localStorage.getItem("i18nextLng") || ""
                )}
          </p>
        </TooltipSimple>

        <p className="truncate text-base">{!open && summary}</p>
      </div>
    );
  }
);

interface ItemHeaderProps {
  id: string | number;
  open: boolean;
  toggleOpen: () => void;
  index: number;
  summary: string;
  updated: string;
  created: string;
  sortField: "updated" | "created";
  showExactTime: boolean;
  isChanged: boolean;
  status: "loading" | "success" | "fail" | undefined;
  handleSave: () => void;
  handleDelete: (id: string | number) => void;
}

const ItemHeader = memo(
  ({
    id,
    toggleOpen,
    open,
    index,
    summary,
    updated,
    created,
    showExactTime,
    isChanged,
    status,
    handleSave,
    handleDelete,
  }: ItemHeaderProps) => {
    return (
      <div className="flex justify-between gap-2 text-sm mb-2 items-center w-full">
        <HeaderText
          index={index}
          open={open}
          summary={summary}
          updated={updated}
          created={created}
          showExactTime={showExactTime}
        />
        <div className="flex-shrink-0 flex gap-2 items-center">
          <Status
            isChanged={isChanged}
            status={status}
            handleSave={handleSave}
          />
          <DeleteTrigger id={id} handleDelete={handleDelete} />
          <CollaspeTrigger open={open} toggleOpen={toggleOpen} />
        </div>
      </div>
    );
  }
);

export default ItemHeader;
