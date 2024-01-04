import React, { useState } from "react";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { useImages } from "../../context/ImagesContext";
import AppOverlay from "../../components/AppOverlay";
import SignUp from "../../components/SignUp";
import Element from "./Element";
import "./Publish.scss";

const Publish = () => {
  const { images, videoMedia } = useImages();
  const [title, SetTitle] = useState("");
  const [overlay, setOverlay] = useState(false);
  const AllImages = Object.values(images);
  const [viewImage, setViewImage] = useState(images.firstImage);

  const Close = () => {
    setOverlay(false);
  };

  const OnTitleChange = (e) => {
    SetTitle(e.target.value);
  };

  const ViewImage = (image) => {
    setViewImage(image);
  };

  return (
    <>
      <div className="publish-container">
        <div className="story-title">
          <p className="story-title__title">Story Title</p>
          <div className="story-title__input">
            <input
              type="text"
              className=""
              placeholder="Pre filled text here for question #1"
              onChange={(e) => OnTitleChange(e)}
              value={title}
            />
            <Question />
          </div>
        </div>
        <div className="images">
          <div className="images-preview">
            <p className="images-preview__title">Preview</p>
            <div className="images-preview__image">
              {<video controls src={videoMedia} className="video" /> || (
                <img src={viewImage} alt="" />
              )}
            </div>
          </div>
          <div className="images-list">
            <div className="elements">
              {AllImages.map((el, idx) => (
                <Element el={el} id={idx} ViewImage={ViewImage} />
              ))}
            </div>
          </div>
        </div>
        <button className="publish-btn" onClick={() => setOverlay(true)}>
          Publish video
        </button>
      </div>
      {overlay ? (
        <AppOverlay close={Close} children={<SignUp close={Close} />} />
      ) : null}
    </>
  );
};

export default Publish;
