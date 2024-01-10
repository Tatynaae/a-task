import React from "react";
import { ReactComponent as Question } from "../../../assets/icons/question.svg";
import clsx from "clsx";
import "./StoryTitle.scss";

const StoryTitle = ({ OnTitleChange, title, placeholder, value }) => {
  return (
    <div className={clsx("story-title")}>
      <input
        type="text"
        className=""
        placeholder={placeholder}
        onChange={(e) => OnTitleChange(e)}
        default={title}
        defaultValue={value}
      />
      <Question />
    </div>
  );
};

export default StoryTitle;
