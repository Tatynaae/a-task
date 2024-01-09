import React from "react";
import clsx from "clsx";
import "./StoryType.scss";

const StoryType = ({
  story,
  isActive,
  setActiveStory,
  variant
}) => {
  const SelectStory = () => {
    setActiveStory(story.id, story.relocate);
  };

  const VariantColor = {
    default: "bot",
    white: "white",
  };

  return (
    <div className={clsx(isActive ? "active" : "story")} onClick={SelectStory}>
      <div className="top">{story.icon}</div>
      <div className={clsx(VariantColor[variant])}>
        <h2>{story.title}</h2>
        <h3>{story.description}</h3>
      </div>
    </div>
  );
};

export default StoryType;
