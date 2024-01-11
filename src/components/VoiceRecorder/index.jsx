import React, { useEffect, useState } from "react";
import { ReactMic } from "react-mic";
import { useAudioStory } from "../../context/AudioStoryContext";
import { ReactComponent as Save } from "../../assets/icons/check.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as StartIcon } from "../../assets/icons/pause.svg";

import "./VoiceRecorder.scss";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const { audioStory, setAudioStory } = useAudioStory();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onDelete = () => {
    setRecordedBlob(null);
    setAudioStory({ ...audioStory, audio: null });
    setMinutes(0);
    setSeconds(0);
  };

  const onSave = () => {
    setIsRecording(false);
    setAudioStory({ ...audioStory, audio: recordedBlob.blobURL });
  };

  useEffect(() => {
    let timerId;

    if (isRecording) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds < 59) {
            return prevSeconds + 1;
          } else {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRecording]);

  const onStop = (recordedBlob, error) => {
    if (error) {
      console.error("Recording error:", error);
    } else if (recordedBlob) {
      console.log("Recording stopped:", recordedBlob);
      setRecordedBlob(recordedBlob);
    } else {
      console.warn("Empty recordedBlob received.");
    }
  };

  return (
    <div
      className={
        audioStory.audio === null ? "voice--content" : "saved-voice--content"
      }
    >
      <>
        {audioStory.audio ? (
          <audio controls className="audio">
            <source src={audioStory.audio} />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div
            className={
              audioStory.audio === null
                ? "voice--content__record"
                : "none-record"
            }
          >
            <p>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
            <ReactMic
              record={isRecording}
              className="sound-wave"
              onStop={onStop}
              onData={(recordedBlob) => console.log("Chunk of real-time data")}
              strokeColor="#fff"
              backgroundColor="transparent"
            />
          </div>
        )}

        <div className="buttons">
          <button
            onClick={onDelete}
            disabled={!recordedBlob}
            style={{
              cursor: isRecording ? "not-allowed" : "pointer",
            }}
          >
            <Delete />
          </button>
          {audioStory.audio === null && (
            <button
              onClick={() =>
                setIsRecording((prevIsRecording) => !prevIsRecording)
              }
            >
              <StartIcon />
            </button>
          )}
          {audioStory.audio === null && (
            <button onClick={onSave} disabled={!recordedBlob}>
              <Save />
            </button>
          )}
        </div>
      </>
    </div>
  );
};

export default VoiceRecorder;
