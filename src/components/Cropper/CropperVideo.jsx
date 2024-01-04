import React, { useState } from "react";
import Cropper from "react-easy-crop";

const CropperVideo = ({ video, onCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const handleCropComplete = () => {
    onCrop(video);
  };

  return (
    <Cropper
      video={video}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={handleCropComplete}
      onZoomChange={handleZoomChange}
      objectFit="contain"
      style={{ width: "100%", height: "100%", objectFit: "center" }}
    />
  );
};

export default CropperVideo;
