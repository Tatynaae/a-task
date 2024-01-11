import React, { useState } from "react";
import { ReactComponent as VideoMedia } from "../../../assets/icons/Line.svg";
import { ReactComponent as Record } from "../../../assets/icons/record.svg";
import AppOverlay from "../../../components/AppOverlay";
import Recording from "./Recording";

const VideoRecord = () => {
  const [overlay, setOverlay] = useState(false);
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };
  return (
    <>
      <div className="video-content__right">
        <div className="video-media">
          <VideoMedia />
          <p>Video File</p>
        </div>
        <button
          className={"record-button"}
          onClick={OpenOverlay}
        >
          <Record />
          Record
        </button>
      </div>
      {overlay ? <AppOverlay close={CloseOverlay} children={<Recording CloseModal={CloseOverlay}/>}/> : ""}
    </>
  );
};

export default VideoRecord;
