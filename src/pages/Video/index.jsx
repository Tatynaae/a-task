/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Upload } from "../../assets/icons/Upload.svg";
import { ReactComponent as Delete } from "../../assets/icons/x.svg";
import { useVideoStory } from "../../context/VideoStoryContext";
import PreviewModal from "../../components/PreviewModal";
import FirstQuestion from "./questions/FirstQuestion";
import AppOverlay from "../../components/AppOverlay";
import FileInput from "../../components/FileInput";
import VideoRecord from "./VideoRecord";
import Select from "../../components/UI/Select";
import StoryTitle from "../../components/UI/StoryTitle";
import "./Video.scss";

const Video = () => {
  const { videoStory, setVideoStory } = useVideoStory();
  const [question, setQuestion] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();

  const styles = ["Style #1", "Style #2", "Style #3"];

  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };
  const Cencel = () => {
    setVideoStory({ ...videoStory, previewVideo: null });
    CloseOverlay();
  };

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoStory({
        ...videoStory,
        previewVideo: URL.createObjectURL(e.target.files[0]),
      });
      OpenOverlay();
    } else setOverlay(false);
  };

  const DeleteVideo = () => {
    setVideoStory({ ...videoStory, previewVideo: null });
  };

  const ThroughQuestions = () => {
    setQuestion((question) => true);
  };

  const ChangeVideoStyle = (option) => {
    setVideoStory({ ...videoStory, style: option });
  };
  const ChangeVideoTitle = (e) => {
    setVideoStory({ ...videoStory, title: e.target.value });
  };

  const able = videoStory.previewVideo && videoStory.style && videoStory.title;
  return (
    <>
      {question ? (
        <section className="video-container">
          <FirstQuestion title={videoStory.title} />
          <div className="video-content">
            <div className="video-content__left">
              <p>Preview</p>
              <div className="upload">
                {videoStory.previewVideo === null ? (
                  <div className="upload__box">
                    <Upload />
                    <label htmlFor="upload">Upload preview</label>
                    <FileInput
                      id="upload"
                      hidden
                      onChange={handleVideoChange}
                      accept="video/mp4,video/x-m4v,video/*"
                    />
                  </div>
                ) : (
                  <>
                    <video
                      controls
                      src={videoStory.previewVideo}
                      className="video"
                    />
                    <div className="delete" onClick={DeleteVideo}>
                      <Delete />
                    </div>
                  </>
                )}
              </div>
            </div>
            <VideoRecord />
          </div>
          <button className="next" onClick={() => navigate("/publish-videos")}>
            Next question
          </button>
          <button className="skip">Skip question</button>
        </section>
      ) : (
        <section className="video-container">
          <h1 className="title">Let's Start Crafting Your [Type] Story!</h1>

          <div className="video-content">
            <div className="video-content__left">
              <p>Preview</p>
              <div className="upload">
                {videoStory.previewVideo === null ? (
                  <div className="upload__box">
                    <Upload />
                    <label htmlFor="upload">Upload preview</label>
                    <FileInput
                      id="upload"
                      hidden
                      onChange={handleVideoChange}
                    />
                  </div>
                ) : (
                  <>
                    <video src={videoStory.previewVideo} controls autoPlay />
                    <div className="delete" onClick={DeleteVideo}>
                      <Delete />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="video-content__right">
              <p>Enter title and choose a style</p>
              <StoryTitle
                placeholder={"My videobiography {type} story."}
                OnTitleChange={ChangeVideoTitle}
              />
              <Select options={styles} changeStyle={ChangeVideoStyle} />
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
      {videoStory.previewVideo && overlay && (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal
              video={videoStory.previewVideo}
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
