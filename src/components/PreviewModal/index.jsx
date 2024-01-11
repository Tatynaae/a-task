import React, { useState } from "react";
import { useVideoStory } from "../../context/VideoStoryContext";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { CropperComponent } from "../Cropper";
import CropperVideo from "../Cropper/CropperVideo";
import "./PreviewModal.scss";

const PreviewModal = ({
  image,
  video,
  close,
  cencel,
  save,
  savepreviewVideo,
}) => {
  const { setVideoStory, videoStory } = useVideoStory();

  const [croppedImageData, setCroppedImageData] = useState(null);
  const [croppedVideo, setCroppedVideo] = useState(null);

  const handleCrop = (data) => {
    setCroppedImageData(data);
  };

  const handleCropVideo = (croppedV) => {
    setCroppedVideo(croppedV);
  };

  const SavepreviewVideo = () => {
    setVideoStory({ ...videoStory, previewVideo: croppedVideo });
  };

  const SaveAndContinue = () => {
    if (image) {
      save(croppedImageData);
      close();
    } else if (video) {
      SavepreviewVideo();
      close();
    }
  };


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
            onClick={SaveAndContinue}
          >
            Save & continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
