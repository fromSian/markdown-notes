import "react-image-crop/dist/ReactCrop.css";

import ReactCrop from "react-image-crop";
const ImageCrop = ({ image, crop, setCrop }) => {
  const onImageLoad = (e) => {
    const { width, height } = e.target;
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
          src={image}
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
