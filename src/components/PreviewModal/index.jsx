import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useImages } from "../../context/ImagesContext";
import CropperVideo from "../Cropper/CropperVideo";
import { CropperComponent } from "../Cropper";
import "./PreviewModal.scss";

const PreviewModal = ({ image, video, close, cencel }) => {
  const { images, setImages, videoMedia, setVideoMedia } = useImages();

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
      if (images.firstImage === null) {
        setImages({
          ...images,
          firstImage: croppedImageData,
        });
        close();
      } else if (images.firstImage !== null && images.secondImage === null) {
        setImages({
          ...images,
          secondImage: croppedImageData,
        });
        close();
      } else if (
        images.firstImage !== null &&
        images.secondImage !== null &&
        images.thirdImage === null
      ) {
        setImages({
          ...images,
          thirdImage: croppedImageData,
        });
        close();
      } else if (
        images.firstImage !== null &&
        images.secondImage !== null &&
        images.thirdImage !== null &&
        images.fourthImage === null
      ) {
        setImages({
          ...images,
          fourthImage: croppedImageData,
        });
        close();
      } else if (
        images.firstImage !== null &&
        images.secondImage !== null &&
        images.thirdImage !== null &&
        images.fourthImage !== null &&
        images.fifthImage === null
      ) {
        setImages({
          ...images,
          fifthImage: croppedImageData,
        });
        close();
      }
    } else if (video) {
      setVideoMedia(croppedVideo);
      close();
    }
  };

  console.log("s1", croppedVideo);
  console.log("s", videoMedia);

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
          <button className="btns--right" onClick={SaveAndContinue}>
            Save & continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
