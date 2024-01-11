import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useVideoStory } from "../../context/VideoStoryContext";
import { useAudioStory } from "../../context/AudioStoryContext";
import StoryTitle from "../../components/UI/StoryTitle";
import AppOverlay from "../../components/AppOverlay";
import Button from "../../components/UI/Button";
import SignUp from "../../components/SignUp";
import Element from "../../components/UI/Element";
import "./Publish.scss";

const Publish = () => {
  const { videoStory, setVideoStory } = useVideoStory();
  const { audioStory, setAudioStory } = useAudioStory();
  const [overlay, setOverlay] = useState(false);
  const AllImages = new Array(5).fill(null);
  const location = useLocation();

  const Close = () => {
    setOverlay(false);
  };

  const ChangeVideoTitle = (e) => {
    setVideoStory({ ...videoStory, title: e.target.value });
  };
  const ChangeAudeioTitle = (e) => {
    setAudioStory({ ...audioStory, title: e.target.value });
  };

  if (location.pathname === "/publish-images") {
    return (
      <>
        <div className="publish-container">
          <div className="publish-container__story-title">
            <p className="publish-container__story-title__title">Story Title</p>
            <StoryTitle
              value={audioStory.title}
              OnTitleChange={ChangeAudeioTitle}
            />
          </div>
          <div className="images">
            <div className="images-preview">
              <p className="images-preview__title">Preview</p>
              <div className="images-preview__image">
                <img src={audioStory.images[0]} alt="" />
              </div>
            </div>
            <div className="images-list">
              <div className="elements">
                {audioStory.images.map((el, idx) => (
                  <Element
                    el={el}
                    id={idx}
                    ViewImage={audioStory.images[idx]}
                    path="/audio"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="publish-btn">
            <Button text={"Publish audio"} onClick={() => setOverlay(true)} />
          </div>
        </div>
        {overlay ? (
          <AppOverlay close={Close} children={<SignUp close={Close} path={'/account'}/>} />
        ) : null}
      </>
    );
  }
  if (location.pathname === "/publish-videos") {
    <>
      <div className="publish-container">
        <div className="publish-container__story-title">
          <p className="publish-container__story-title__title">Story Title</p>
          <StoryTitle
            value={videoStory.title}
            OnTitleChange={ChangeVideoTitle}
          />
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
            </div>
          </div>
          <div className="images-list">
            <div className="elements">
              {AllImages.map((el, idx) => (
                <Element
                  el={el}
                  id={idx}
                  ViewImage={videoStory.previewVideo}
                  path="/video"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="publish-btn">
          <Button text={"Publish video"} onClick={() => setOverlay(true)} />
        </div>
      </div>
      {overlay ? (
        <AppOverlay close={Close} children={<SignUp close={Close} path={'/account'}/>} />
      ) : null}
    </>;
  }
  return null;
};

export default Publish;
