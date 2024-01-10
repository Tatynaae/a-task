import React, { useState } from "react";
import { useImages } from "../../context/ImagesContext";
import { CropperComponent } from "../Cropper";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import CropperVideo from "../Cropper/CropperVideo";
import "./PreviewModal.scss";

const PreviewModal = ({ image, video, close, cencel, save }) => {
  const { images, setImages, setVideoMedia } = useImages();

  const [croppedImageData, setCroppedImageData] = useState(null);
  const [croppedVideo, setCroppedVideo] = useState(null);

  const handleCrop = (data) => {
    setCroppedImageData(data);
  };

  const handleCropVideo = (croppedV) => {
    setCroppedVideo(croppedV);
  };

  const SaveAndContinue = () => {
    if (image) {
      const imageKeys = [
        "firstImage",
        "secondImage",
        "thirdImage",
        "fourthImage",
        "fifthImage",
      ];
      const nextImageIndex = imageKeys.findIndex((key) => images[key] === null);

      if (nextImageIndex !== -1) {
        setImages({
          ...images,
          [imageKeys[nextImageIndex]]: croppedImageData,
        });
        close();
      }
    } else if (video) {
      setVideoMedia(croppedVideo);
      close();
    }
  };

  const Save = () => {
    save(croppedImageData)
  }

  return (
    <div className="preview">
      <div className="preview--head">
        <p>Upload preview</p>
        <button className="close" onClick={close}>
          <CloseIcon />
        </button>
      </div>
      <div className="preview--crop">
        <div className="preview--crop__cropper">
          {image ? (
            <CropperComponent src={image} onCrop={handleCrop} />
          ) : (
            <CropperVideo
              video={video}
              onCrop={handleCropVideo}
              className="cropper-video"
            />
          )}
        </div>
        <div className="btns">
          <button className="btns--left" onClick={cencel}>
            Cancel
          </button>
          <button
            className="btns--right"
            onClick={save ? Save : SaveAndContinue}
          >
            Save & continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
