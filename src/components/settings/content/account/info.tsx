import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCroppedImage } from "@/lib/image";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Loader } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import ImageCrop from "./image";

const hasAvatar = true;
const Info = () => {
  const [open, setOpen] = useState(false);
  const uploadRef = useRef();
  const [image, setImage] = useState();
  const [crop, setCrop] = useState();
  const [fileLoading, setFileLoading] = useState(false);

  const onOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setImage(undefined);
    }
  };

  const openFilePick = () => {
    uploadRef.current && uploadRef.current.click();
  };

  const onUploadFile = useCallback(
    (event) => {
      if (event.target.files && event.target.files.length > 0) {
        setFileLoading(true);
        if (event.target.files[0].size > 1024 * 1024 * 2) {
          toast.error("max 2mb");
          return;
        }
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          setFileLoading(false);

          setImage(reader.result);
        });

        reader.readAsDataURL(event.target.files[0]);

        if (!open) {
          setOpen(true);
        }
      }
    },
    [open]
  );

  const onSave = useCallback(async () => {
    const _image = new Image();
    _image.url = image;
    const out = await getCroppedImage(_image, crop);
    setOpen(false);
  }, [crop, image]);
  return (
    <div className="flex gap-4 sm:gap-8 items-center justify-center mb-8">
      <div className="flex-shrink-0 bg-red-700 opacity-75 w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer">
        {hasAvatar ? (
          <p onClick={() => setOpen(true)}>avatar</p>
        ) : (
          <p onClick={openFilePick}>none</p>
        )}
      </div>
      <div>
        <p className="mb-4 text-lg">fromsian@163.com</p>
        <button>trial</button>
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
            <DialogTitle>Upload Avatar</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-center">
            <ImageCrop
              image={image}
              onUploadFile={onUploadFile}
              crop={crop}
              setCrop={setCrop}
            />
            <div
              className={cn(
                "flex justify-center gap-4 items-center",
                !image && "flex-col"
              )}
            >
              {fileLoading ? <Loader className="animate-spin" /> : ""}
              {!image && !fileLoading ? (
                <>
                  <ImageIcon
                    className="animate-bounce cursor-pointer"
                    size={28}
                    onClick={openFilePick}
                  />
                  <p>no image please upload.</p>
                </>
              ) : (
                <>
                  <button onClick={openFilePick}>upload</button>
                  <button onClick={onSave}>submit</button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Info;
