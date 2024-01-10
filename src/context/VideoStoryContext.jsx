import React, { createContext, useState, useContext } from "react";

const VideoStoryContext = createContext();

export const useVideoStory = () => {
  return useContext(VideoStoryContext);
};

export const VideoStoryProvider = ({ children }) => {
  const [videoStory, setVideoStory] = useState({
    title: "",
    style: "",
    previewVideo: null,
    recordedVideo: null,
  });

  return (
    <VideoStoryContext.Provider value={{ videoStory, setVideoStory }}>
      {children}
    </VideoStoryContext.Provider>
  );
};
