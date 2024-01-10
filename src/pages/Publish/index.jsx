import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useVideoStory } from "../../context/VideoStoryContext";
import { useImages } from "../../context/ImagesContext";
import StoryTitle from "../../components/UI/StoryTitle";
import AppOverlay from "../../components/AppOverlay";
import Button from "../../components/UI/Button";
import SignUp from "../../components/SignUp";
import Element from "../../components/UI/Element";
import "./Publish.scss";

const Publish = () => {
  const { images } = useImages();
  const { videoStory, setVideoStory } = useVideoStory();
  const [overlay, setOverlay] = useState(false);
  const AllImages = Object.values(images);
  const [viewImage, setViewImage] = useState(images.firstImage);
  const location = useLocation();

  const Close = () => {
    setOverlay(false);
  };

  const ViewImage = (image) => {
    setViewImage(image);
  };

  const ChangeTitle = (e) => {
    setVideoStory({ ...videoStory, title: e.target.value });
  };

  return (
    <>
      <div className="publish-container">
        <div className="publish-container__story-title">
          <p className="publish-container__story-title__title">Story Title</p>
          <StoryTitle value={videoStory.title} OnTitleChange={ChangeTitle} />
        </div>
        <div className="images">
          <div className="images-preview">
            <p className="images-preview__title">Preview</p>
            <div className="images-preview__image">
              {location.pathname === "/publish-videos" && (
                <video
                  controls
                  src={videoStory.previewVideo}
                  className="video"
                />
              )}
              {location.pathname === "/publish-images" && (
                <img src={viewImage} alt="#" />
              )}
            </div>
          </div>
          <div className="images-list">
            <div className="elements">
              {AllImages.map((el, idx) => (
                <Element el={el} id={idx} ViewImage={ViewImage} path="/video" />
              ))}
            </div>
          </div>
        </div>
        <div className="publish-btn">
          <Button text={"Publish video"} onClick={() => setOverlay(true)} />
        </div>
      </div>
      {overlay ? (
        <AppOverlay close={Close} children={<SignUp close={Close} />} />
      ) : null}
    </>
  );
};

export default Publish;
