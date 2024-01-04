import React, { useState } from "react";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import PreviewModal from "../../components/PreviewModal";
import { useImages } from "../../context/ImagesContext";
import AppOverlay from "../../components/AppOverlay";
import SignUp from "../../components/SignUp";
import Element from "./Element";
import "./Publish.scss";

const Publish = () => {
  const { images } = useImages();
  const [title, SetTitle] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [childOverlay, setChildOverlay] = useState(false);
  const [childFile, setChildFile] = useState(null);
  const AllImages = Object.values(images);

  const Close = () => {
    setOverlay(false);
  };

  const OnTitleChange = (e) => {
    SetTitle(e.target.value);
  };

  const CloseChildOverlay = () => {
    setChildOverlay(false);
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
              <img src={images.firstImage} alt="" />
            </div>
          </div>
          <div className="images-list">
            <div className="elements">
              {AllImages.map((el, idx) => (
                <Element
                  el={el}
                  id={idx}
                  setChildOverlay={setChildOverlay}
                  setChildFile={setChildFile}
                />
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
      {childOverlay ? (
        <AppOverlay
          close={CloseChildOverlay}
          children={
            <PreviewModal
              image={childFile}
              close={CloseChildOverlay}
              cencel={CloseChildOverlay}
            />
          }
        />
      ) : null}
    </>
  );
};

export default Publish;
