import React, { useState } from "react";
import { ReactComponent as VideoMedia } from "../../../assets/icons/Line.svg";
import { ReactComponent as Record } from "../../../assets/icons/record.svg";
import { ReactComponent as Delete } from "../../../assets/icons/delete-recorded.svg";
import { ReactComponent as Volume } from "../../../assets/icons/should-deleted.svg";
import AppOverlay from "../../../components/AppOverlay";
import Recording from "./Recording";
import { useSourse } from "../../../context/SourseContext";
import ReactPlayer from "react-player/lazy";

const VideoRecord = () => {
  const { sourse, setSourse } = useSourse();
  const [overlay, setOverlay] = useState(false);
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };
  const DeleteVideo = () => {
    setSourse({ ...sourse, video: null });
  };

  const ableToRecord = sourse.video !== null;
  return (
    <>
      <div className="video-content__right">
        <div className="video-media">
          {sourse.video ? (
            <ReactPlayer
              url={sourse.video}
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
        {sourse.video ? (
          <div className="done-media">
            {/* can't do this player */}
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
