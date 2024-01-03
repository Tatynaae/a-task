/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ReactComponent as Upload } from "../../assets/icons/Upload.svg";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { ReactComponent as Down } from "../../assets/icons/down-arrow.svg";
import { ReactComponent as Up } from "../../assets/icons/up-arrow.svg";
import { ReactComponent as Delete } from "../../assets/icons/x.svg";
import PreviewModal from "../../components/PreviewModal";
import FirstQuestion from "./questions/FirstQuestion";
import AppOverlay from "../../components/AppOverlay";
import FileInput from "../../components/FileInput";
import VideoRecord from "./VideoRecord";
import "./Video.scss";

const Video = () => {
  const [selectedStyle, setSelectedStyle] = useState(false);
  const [question, setQuestion] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [save, setSave] = useState(false);

  const [story, setStory] = useState({
    storyTitle: "",
    storyImage: null,
    storyStyle: "",
  });

  const styles = ["Style #1", "Style #2", "Style #3"];
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
    setStory({
      ...story,
      storyImage: null,
    });
  };
  const Cencel = () => {
    setStory({
      ...story,
      storyImage: null,
    });
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setStory({
        ...story,
        storyImage: URL.createObjectURL(e.target.files[0]),
      });
      OpenOverlay();
    } else setOverlay(false);
  };

  const DeleteImage = () => {
    setStory({
      ...story,
      storyImage: null,
    });
  };

  const SetStyle = (style) => {
    setStory({
      ...story,
      storyStyle: style,
    });
  };
  const SetTitle = (e) => {
    setStory({
      ...story,
      storyTitle: e.target.value,
    });
  };

  const handleChange = () => {
    setSelectedStyle(!selectedStyle);
  };

  const SaveAndContinue = () => {
    setSave(true);
    setOverlay(false);
  };

  const ThroughQuestions = () => {
    setQuestion(true);
  };

  const able = story.storyImage && story.storyStyle && story.storyTitle;
  return (
    <>
      {question ? (
        <section className="video-container">
          <FirstQuestion OnTitleChange={SetStyle} title={story.storyTitle} />
          <div className="video-content">
            <div className="video-content__left">
              <p>Preview</p>
              <div className="upload">
                {story.storyImage === null ? (
                  <div className="upload__box">
                    <Upload />
                    <label htmlFor="upload">Upload preview</label>
                    <FileInput
                      id="upload"
                      hidden
                      onChange={handleImageChange}
                    />
                  </div>
                ) : (
                  <>
                    <img src={story.storyImage} alt="" />
                    <div className="delete" onClick={DeleteImage}>
                      <Delete />
                    </div>
                  </>
                )}
              </div>
            </div>
            <VideoRecord />
          </div>
          <button className="next">Next question</button>
          <button className="skip">Skip question</button>
        </section>
      ) : (
        <section className="video-container">
          <h1 className="title">Let's Start Crafting Your [Type] Story!</h1>

          <div className="video-content">
            <div className="video-content__left">
              <p>Preview</p>
              <div className="upload">
                {story.storyImage === null ? (
                  <div className="upload__box">
                    <Upload />
                    <label htmlFor="upload">Upload preview</label>
                    <FileInput
                      id="upload"
                      hidden
                      onChange={handleImageChange}
                    />
                  </div>
                ) : (
                  <>
                    <img src={story.storyImage} alt="" />
                    <div className="delete" onClick={DeleteImage}>
                      <Delete />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="video-content__right">
              <p>Enter title and choose a style</p>
              <div className="story-title">
                <input
                  type="text"
                  onChange={(e) => SetTitle(e)}
                  placeholder="My videobiography {type} story."
                />
                <Question />
              </div>
              <div
                className={
                  selectedStyle ? "storyStyleSelectOpened" : "storyStyleSelect"
                }
                onClick={handleChange}
              >
                <label htmlFor="storyStyle">
                  {story.storyStyle
                    ? story.storyStyle
                    : "Select a style for your story:"}
                </label>
                <div>{selectedStyle ? <Up /> : <Down />}</div>
                {selectedStyle && (
                  <ul className="list">
                    {styles.map((style) => (
                      <li onClick={() => SetStyle(style)}>{style}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={ThroughQuestions}
            className={able ? "first-q" : "disabled"}
            disabled={!able}
          >
            First question
          </button>
        </section>
      )}
      {story.storyImage && overlay && (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal
              SaveFunc={SaveAndContinue}
              image={story.storyImage}
              close={CloseOverlay}
              cencel={Cencel}
              save
            />
          }
        />
      )}
    </>
  );
};

export default Video;
