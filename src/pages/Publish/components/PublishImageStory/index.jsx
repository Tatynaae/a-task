import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudioStory } from "../../../../context/AudioStoryContext";
import StoryTitle from "../../../../components/UI/StoryTitle";
import AppOverlay from "../../../../components/AppOverlay";
import Button from "../../../../components/UI/Button";
import SignUp from "../../../../components/SignUp";
import Element from "../../../../components/UI/Element";

import "./PublishImageStory.scss";

const PublishImageStory = () => {
  const navigate = useNavigate()
  const { audioStory, setAudioStory } = useAudioStory();
  const [overlay, setOverlay] = useState(false);

  const savedSignup = localStorage.getItem("signup");
  const savedLogin = localStorage.getItem("login");

  const Close = () => {
    setOverlay(false);
  };

  const ChangeAudeioTitle = (e) => {
    setAudioStory({ ...audioStory, title: e.target.value });
  };

  const publishImages = () => {
    if (savedSignup || savedLogin) {
      navigate('/account')
    } else {
      setOverlay(true);
    }
  };

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
                <Element el={el} id={idx} path="/audio" key={idx} />
              ))}
            </div>
          </div>
        </div>
        <div className="publish-btn">
          <Button text={"Publish audio"} onClick={publishImages} />
        </div>
      </div>
      {overlay ? (
        <AppOverlay
          close={Close}
          children={<SignUp close={Close} path={"/account"} />}
        />
      ) : null}
    </>
  );
};

export default PublishImageStory;
