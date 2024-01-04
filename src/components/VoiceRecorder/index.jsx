import React, { useEffect, useState } from "react";
import { useSourse } from "../../context/SourseContext";
import { ReactMic } from "react-mic";
import { ReactComponent as Save } from "../../assets/icons/check.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Record } from "../../assets/icons/record.svg";
import { ReactComponent as StartIcon } from "../../assets/icons/pause.svg";

import "./VoiceRecorder.scss";

const VoiceRecorder = ({ able, setStartRecord, startRecord }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const { sourse, setSourse } = useSourse();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const Start = () => {
    setStartRecord(true);
    setMinutes(0);
    setSeconds(0);
  };

  const onDelete = () => {
    setRecordedBlob(null);
    setSourse({ ...sourse, audio: null });
    setMinutes(0);
    setSeconds(0);
  };

  const onSave = () => {
    setIsRecording(false);
    setSourse({ ...sourse, audio: recordedBlob });
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
        sourse.audio === null ? "voice--content" : "saved-voice--content"
      }
    >
      {startRecord && sourse.audio === null && recordedBlob === null && (
        <>
          {sourse.audio ? (
            <audio controls className="audio">
              <source src={recordedBlob.blobURL} />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div
              className={
                sourse.audio === null ? "voice--content__record" : "none-record"
              }
            >
              <p>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
              <ReactMic
                record={isRecording}
                className="sound-wave"
                onStop={onStop}
                onData={(recordedBlob) =>
                  console.log("Chunk of real-time data")
                }
                strokeColor="#fff"
                backgroundColor="transparent"
              />
            </div>
          )}

          <div className="btns">
            <button
              onClick={onDelete}
              disabled={!recordedBlob}
              style={{
                cursor: isRecording ? "not-allowed" : "pointer",
              }}
            >
              <Delete />
            </button>
            {sourse.audio === null && (
              <button
                onClick={() =>
                  setIsRecording((prevIsRecording) => !prevIsRecording)
                }
              >
                <StartIcon />
              </button>
            )}
            {sourse.audio === null && (
              <button onClick={onSave} disabled={!recordedBlob}>
                <Save />
              </button>
            )}
          </div>
        </>
      )}

      {recordedBlob === null && !startRecord && (
        <button
          disabled={able}
          onClick={Start}
          className={able ? "disable" : "record-button"}
        >
          <Record />
          Record
        </button>
      )}
    </div>
  );
};

export default VoiceRecorder;
