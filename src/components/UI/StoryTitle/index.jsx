import React from "react";
import { ReactComponent as Question } from "../../../assets/icons/question.svg";
import "./StoryTitle.scss";

const StoryTitle = ({ OnTitleChange, title, placeholder }) => {
  return (
    <div className="story-title">
      <input
        type="text"
        className=""
        placeholder={placeholder}
        onChange={(e) => OnTitleChange(e)}
        default={title}
      />
      <Question />
    </div>
  );
};

export default StoryTitle;
