import React, { createContext, useState, useContext } from "react";

const SourseContext = createContext();

export const useSourse = () => {
  return useContext(SourseContext);
};

export const SourseProvider = ({ children }) => {
  const [sourse, setSourse] = useState({
    audio: null,
    video: null,
  });
  return (
    <SourseContext.Provider value={{ sourse, setSourse }}>
      {children}
    </SourseContext.Provider>
  );
};
