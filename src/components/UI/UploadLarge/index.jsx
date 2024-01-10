import React from "react";
import FileInput from "../../FileInput";
import { ReactComponent as X } from "../../../assets/icons/x.svg";
import { ReactComponent as Upload } from "../../../assets/icons/Upload.svg";
import "./UploadLarge.scss";

const UploadLarge = ({ image, RemoveImage, ChangeImage }) => {
  if (image) {
    return (
      <div className="uploaded">
        <img src={image} alt="" />
        <div className="uploaded--close" onClick={RemoveImage}>
          <X />
        </div>
      </div>
    );
  }
  return (
    <div className="upload">
      <Upload />
      <label htmlFor="upload-preview">Upload preview</label>
      <FileInput id={"upload-preview"} hidden onChange={ChangeImage} />
    </div>
  );
};

export default UploadLarge;
