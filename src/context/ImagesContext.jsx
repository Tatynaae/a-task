import React, { createContext, useState, useContext } from "react";

const ImagesContext = createContext();

export const useImages = () => {
  return useContext(ImagesContext);
};

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState({
    firstImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
    fifthImage: null,
  });
  const [videoMedia, setVideoMedia] = useState(null);

  return (
    <ImagesContext.Provider value={{ images, setImages, videoMedia, setVideoMedia }}>
      {children}
    </ImagesContext.Provider>
  );
};
