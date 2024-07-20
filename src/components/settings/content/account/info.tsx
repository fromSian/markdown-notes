import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { Loader, Upload, User } from "lucide-react";
import {
  ChangeEvent,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Crop } from "react-image-crop";
import { toast } from "sonner";
import ImageCrop from "./image";

const TrailToBase = lazy(() => import("./trail-to-base.tsx"));
const PasswordChange = lazy(() => import("./password-change.tsx"));
const GoogleToBase = lazy(() => import("./google-to-base.tsx"));

const Info = () => {
  const { t } = useTranslation("settings");
  const { account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string>();
  const [crop, setCrop] = useState<Crop>();
  const [fileLoading, setFileLoading] = useState(false);
  const [file, setFile] = useState<Blob>();
  const [image, setImage] = useState();

  const imageRef = useRef<HTMLImageElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (account) {
      setSrc(account.image);
    }
  }, [account]);

  const onOpenChange = (v: boolean) => {
    setOpen(v);
  };

  const openFilePick = () => {
    uploadRef.current && uploadRef.current.click();
  };

  const onUploadFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setFileLoading(true);
        if (event.target.files[0].size > 1024 * 1024 * 2) {
          toast.error("max 2mb");
          return;
        }
        const url = URL.createObjectURL(event.target.files[0]);
        setSrc(url);
        setFileLoading(false);
        setFile(event.target.files[0]);
        if (!open) {
          setOpen(true);
        }
      }
    },
    [open]
  );

  const getCropBoundingRect = (image: HTMLImageElement, crop: Crop) => {
    const widthRatio = image.naturalWidth
      ? image.naturalWidth / image.width
      : 1;
    const heightRatio = image.naturalHeight
      ? image.naturalHeight / image.height
      : 1;
    const left = crop.x * widthRatio;
    const upper = crop.y * heightRatio;
    const right = left + crop.width * widthRatio;
    const lower = upper + crop.height * heightRatio;
    return { left, upper, right, lower };
  };
  const onSave = useCallback(async () => {
    if (!imageRef.current || !crop) {
      return;
    }
    const { left, upper, right, lower } = getCropBoundingRect(
      imageRef.current,
      crop
    );
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("left", left + "");
    formData.append("upper", upper + "");
    formData.append("right", right + "");
    formData.append("lower", lower + "");
    const url = "/account/avatar/";
    const response = await request.put(url, formData);
    dispatch({
      type: "account/setAccount",
      payload: response,
    });
    setOpen(false);
  }, [crop, file]);

  return (
    <>
      <div className="flex gap-4 sm:gap-6 items-center justify-center mb-8 truncate">
        <div
          className="group flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full items-center justify-center cursor-pointer relative hidden xxs:flex"
          style={{ background: !account?.image ? "#D07D07" : "transparent" }}
        >
          {account?.image ? (
            <img
              className="w-full h-full rounded-full group-hover:blur-sm"
              src={account.image}
              alt={account.email}
            />
          ) : (
            <User size={48} />
          )}
          <Upload
            className="absolute z-10 hidden group-hover:block cursor-pointer hover:scale-110 active:scale-95 transition-all rounded-sm bg-bgBlur backdrop-blur-sm"
            onClick={openFilePick}
          />
        </div>
        <div>
          <p className="mb-2 text-base xs:text-2xl font-bold truncate">
            {account?.type === "trial" ? "trial user" : account?.email}
          </p>
          <p className="text-ttertiary truncate text-sm xs:text-base">
            {t(`type.${account?.type}`)}
          </p>
        </div>
        <input
          className="hidden"
          ref={uploadRef}
          type="file"
          accept="image/*"
          onChange={onUploadFile}
        />

        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger></DialogTrigger>

          <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>{t("avatar.title")}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 items-center">
              <ImageCrop
                src={src}
                crop={crop}
                setCrop={setCrop}
                imageRef={imageRef}
              />
              <div
                className={cn(
                  "flex justify-center gap-8 items-center",
                  !src && "flex-col"
                )}
              >
                {fileLoading ? <Loader className="animate-spin" /> : ""}

                <button className="btn" onClick={openFilePick}>
                  {t("avatar.upload")}
                </button>
                <button className="btn" onClick={onSave}>
                  {t("avatar.submit")}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {account?.type === "base" && (
        <Suspense fallback={<Loader className="animate-spin" />}>
          <PasswordChange email={account?.email} />
        </Suspense>
      )}

      {account?.type === "trial" && (
        <Suspense fallback={<Loader className="animate-spin" />}>
          <TrailToBase />
        </Suspense>
      )}

      {account?.type === "google" && (
        <Suspense fallback={<Loader className="animate-spin" />}>
          <GoogleToBase email={account?.email} />
        </Suspense>
      )}
    </>
  );
};

export default Info;
