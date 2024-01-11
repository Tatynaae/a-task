import React, { createContext, useState, useContext } from "react";

const PrintStoryContext = createContext();

export const usePrintStory = () => {
  return useContext(PrintStoryContext);
};

export const PrintStoryProvider = ({ children }) => {
  const [printStory, setPrintStory] = useState({
    title: "",
    style: "",
    images: new Array(5).fill(null),
    text: "",
  });

  return (
    <PrintStoryContext.Provider value={{printStory,setPrintStory}}>
      {children}
    </PrintStoryContext.Provider>
  );
};