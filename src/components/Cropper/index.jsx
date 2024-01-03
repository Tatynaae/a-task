import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export const CropperComponent = ({ src, onCrop }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedImageData = cropper.getCroppedCanvas().toDataURL();
    onCrop(croppedImageData);
  };

  return (
    <Cropper
      src={src}
      style={{ height: "100%", width: "100%" }}
      initialAspectRatio={16 / 9}
      guides={false}
      crop={handleCrop}
      ref={cropperRef}
    />
  );
};
