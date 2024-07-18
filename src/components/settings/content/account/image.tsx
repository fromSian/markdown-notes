import "react-image-crop/dist/ReactCrop.css";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  SyntheticEvent,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";

interface ImageCropProps {
  src: string | undefined;
  crop: Crop | undefined;
  setCrop: Dispatch<SetStateAction<Crop | undefined>>;
  imageRef: MutableRefObject<HTMLImageElement | null>;
}

const ImageCrop = ({ src, crop, setCrop, imageRef }: ImageCropProps) => {
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.target as HTMLImageElement;
    let big, small;
    if (width >= height) {
      big = width;
      small = height;
    } else {
      big = height;
      small = width;
    }
    setCrop({
      unit: "px",
      width: small,
      height: small,
      x: width >= height ? (big - small) / 2 : 0,
      y: width < height ? (big - small) / 2 : 0,
    });
  };

  return (
    <>
      <ReactCrop
        circularCrop={true}
        aspect={1}
        crop={crop}
        onChange={(c) => setCrop(c)}
      >
        <img
          ref={imageRef}
          src={src}
          onLoad={onImageLoad}
          style={{
            maxWidth: 400,
            maxHeight: 400,
            objectFit: "cover",
          }}
        />
      </ReactCrop>
    </>
  );
};

export default ImageCrop;
