import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useImages } from "../../context/ImagesContext";
import { CropperComponent } from "../Cropper";
import "./PreviewModal.scss";

const PreviewModal = ({ image, close, cencel, save, SaveFunc }) => {
  const { images, setImages } = useImages();

  const [croppedImageData, setCroppedImageData] = useState(null);

  const handleCrop = (data) => {
    setCroppedImageData(data);
  };

  const SaveAndContinue = () => {
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
          <CropperComponent src={image} onCrop={handleCrop} />
        </div>
        <div className="btns">
          <button className="btns--left" onClick={cencel}>
            Cancel
          </button>
          <button
            className="btns--right"
            onClick={save ? SaveFunc : SaveAndContinue}
          >
            Save & continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
