/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Upload } from "../../assets/icons/Upload.svg";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { ReactComponent as Down } from "../../assets/icons/down-arrow.svg";
import { ReactComponent as Up } from "../../assets/icons/up-arrow.svg";
import { ReactComponent as Delete } from "../../assets/icons/x.svg";
import { useImages } from "../../context/ImagesContext";
import PreviewModal from "../../components/PreviewModal";
import FirstQuestion from "./questions/FirstQuestion";
import AppOverlay from "../../components/AppOverlay";
import FileInput from "../../components/FileInput";
import VideoRecord from "./VideoRecord";
import "./Video.scss";

const Video = () => {
  const { videoMedia, setVideoMedia } = useImages();
  const [selectedStyle, setSelectedStyle] = useState(false);
  const [question, setQuestion] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate()

  const [story, setStory] = useState({
    storyTitle: "",
    storyVideo: videoMedia,
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
      storyVideo: null,
    });
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setStory({
        ...story,
        storyVideo: URL.createObjectURL(e.target.files[0]),
      });
      OpenOverlay();
    } else setOverlay(false);
  };

  const DeleteImage = () => {
    setVideoMedia(null);
    setStory({
      ...story,
      storyVideo: null,
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

  // const SaveAndContinue = () => {
  //   setSave(true);
  //   setOverlay(false);
  // };

  const ThroughQuestions = () => {
    setQuestion(true);
  };

  const able = story.storyVideo && story.storyStyle && story.storyTitle;
  return (
    <>
      {question ? (
        <section className="video-container">
          <FirstQuestion OnTitleChange={SetStyle} title={story.storyTitle} />
          <div className="video-content">
            <div className="video-content__left">
              <p>Preview</p>
              <div className="upload">
                {story.storyVideo === null ? (
                  <div className="upload__box">
                    <Upload />
                    <label htmlFor="upload">Upload preview</label>
                    <FileInput
                      id="upload"
                      hidden
                      onChange={handleImageChange}
                      accept="video/mp4,video/x-m4v,video/*"
                    />
                  </div>
                ) : (
                  <>
                    <video controls src={videoMedia} className="video" />
                    <div className="delete" onClick={DeleteImage}>
                      <Delete />
                    </div>
                  </>
                )}
              </div>
            </div>
            <VideoRecord />
          </div>
          <button className="next" onClick={() => navigate('/publish-videos')}>Next question</button>
          <button className="skip">Skip question</button>
        </section>
      ) : (
        <section className="video-container">
          <h1 className="title">Let's Start Crafting Your [Type] Story!</h1>

          <div className="video-content">
            <div className="video-content__left">
              <p>Preview</p>
              <div className="upload">
                {story.storyVideo === null ? (
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
                    {/* <img src={story.storyVideo} alt="" /> */}
                    <video src={videoMedia} controls autoPlay />
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
      {story.storyVideo && overlay && (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal
              video={story.storyVideo}
              close={CloseOverlay}
              cencel={Cencel}
            />
          }
        />
      )}
    </>
  );
};

export default Video;
