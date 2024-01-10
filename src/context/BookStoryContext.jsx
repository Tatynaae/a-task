import React, { createContext, useState, useContext } from "react";

const BookStoryContext = createContext();

export const useBookStory = () => {
  return useContext(BookStoryContext);
};

export const BookStoryProvider = ({ children }) => {
  const [bookStory, setBookStory] = useState({
    title: "",
    style: "",
    preview: null,
    images: new Array(5).fill(null),
    text: "",
  });
  return (
    <BookStoryContext.Provider value={{ bookStory, setBookStory }}>
      {children}
    </BookStoryContext.Provider>
  );
};
