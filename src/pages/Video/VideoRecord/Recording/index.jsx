import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { ReactComponent as Close } from "../../../../assets/icons/x.svg";
import { ReactComponent as Warning } from "../../../../assets/icons/Warning.svg";
import { ReactComponent as Upload } from "../../../../assets/icons/Layer.svg";
import { useVideoStory } from "../../../../context/VideoStoryContext";
import FileInput from "../../../../components/FileInput";
import "./Recording.scss";

const Recording = ({ CloseModal }) => {
  const { videoStory, setVideoStory } = useVideoStory();
  const [startRecord, setStartRecord] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  const handleStartRecording = async () => {
    setStartRecord(true);
    startRecording();
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      startRecording(userMediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setStartRecord(false);
  };

  const handleDoneRecording = () => {
    setVideoStory({ ...videoStory, recordedVideo: mediaBlobUrl });
    CloseModal();
  };

  const VideoPreview = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    if (!stream) {
      return null;
    }

    return (
      <video
        ref={videoRef}
        width={"100%"}
        height={"100%"}
        autoPlay
        controls
        loop
      />
    );
  };

  const SetUploadVideo = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    setVideoStory({ ...videoStory, recordedVideo: file });
    CloseModal();
  };

  return (
    <div className="recording">
      <div className="recording__head">
        <p>Record video clip</p>
        <span className="close" onClick={CloseModal}>
          <Close />
        </span>
      </div>
      <div className="recording__content">
        {mediaBlobUrl === undefined && !startRecord && (
          <div className="allow">
            <div className="allow__warning">
              <Warning />
              <p>
                Allow screen recording access in <span>system preferences</span>
              </p>
            </div>
          </div>
        )}
        {startRecord ? (
          <div className="start-recording">
            <VideoPreview stream={previewStream} />
          </div>
        ) : (
          mediaBlobUrl !== undefined && (
            <div className="start-recording">
              <video
                src={mediaBlobUrl}
                controls
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )
        )}

        <div className="recording__content--buttons">
          <label
            htmlFor="upload"
            className="recording__content--buttons__upload"
          >
            <Upload /> Upload Video
          </label>
          <FileInput
            id="upload"
            hidden
            onChange={(e) => SetUploadVideo(e)}
            accept="video/mp4,video/x-m4v,video/*"
          />

          {mediaBlobUrl !== undefined ? (
            <button
              className="recording__content--buttons__done"
              onClick={handleDoneRecording}
            >
              Done
            </button>
          ) : status === "recording" ? (
            <button
              className="recording__content--buttons__record"
              onClick={handleStopRecording}
            >
              Stop
            </button>
          ) : (
            <button
              className="recording__content--buttons__record"
              onClick={handleStartRecording}
              disabled={status === "recording"}
            >
              Record
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recording;
