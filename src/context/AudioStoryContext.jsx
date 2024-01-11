import React, { createContext, useState, useContext } from "react";

const AudioStoryContext = createContext();

export const useAudioStory = () => {
  return useContext(AudioStoryContext);
};

export const AudioStoryProvider = ({ children }) => {
  const [audioStory, setAudioStory] = useState({
    title: "",
    previewImage: null,
    style: "",
    images: new Array(5).fill(null),
    text: "",
    audio: null,
  });

  return (
    <AudioStoryContext.Provider value={{audioStory,setAudioStory}}>
      {children}
    </AudioStoryContext.Provider>
  );
};
