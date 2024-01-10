/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import Recording from "./Recording";
import AppOverlay from "../../../components/AppOverlay";
import { useVideoStory } from "../../../context/VideoStoryContext";
import { ReactComponent as Record } from "../../../assets/icons/record.svg";
import { ReactComponent as VideoMedia } from "../../../assets/icons/Line.svg";
import { ReactComponent as Delete } from "../../../assets/icons/delete-recorded.svg";
import { ReactComponent as Volume } from "../../../assets/icons/should-deleted.svg";

const VideoRecord = () => {
  const [overlay, setOverlay] = useState(false);
  const { videoStory, setVideoStory } = useVideoStory();
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };
  const DeleteVideo = () => {
    setVideoStory({ ...videoStory, recordedVideo: null });
  };

  const ableToRecord = videoStory.recordedVideo !== null;
  return (
    <>
      <div className="video-content__right">
        <div className="video-media">
          {videoStory.recordedVideo ? (
            <ReactPlayer
              url={videoStory.recordedVideo}
              controls
              width={"100%"}
              height={"100%"}
            />
          ) : (
            <>
              <VideoMedia />
              <p>Video File</p>
            </>
          )}
        </div>
        {videoStory.recordedVideo ? (
          <div className="done-media">
            <Volume />
            <div className="delete-video" onClick={DeleteVideo}>
              <Delete />
            </div>
          </div>
        ) : (
          <button
            className={ableToRecord ? "record-button-d" : "record-button"}
            disabled={ableToRecord}
            onClick={OpenOverlay}
          >
            <Record />
            Record
          </button>
        )}
      </div>
      {overlay ? (
        <AppOverlay
          close={CloseOverlay}
          children={<Recording CloseModal={CloseOverlay} />}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default VideoRecord;
