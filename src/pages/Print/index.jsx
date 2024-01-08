import React, { useState } from "react";
import Title from "../../components/UI/Title";
import Button from "../../components/UI/Button";
import StoryTitle from "../../components/UI/StoryTitle";
import "./Print.scss";

const Print = () => {
  const [story, setStory] = useState({
    title: "",
  });

  const onStoryTitleChnage = (e) => {
    setStory({ ...story, title: e.target.value });
  };

  return (
    <div className="print">
      <Title text={"Your printed [Type] Story!"} />
      <div className="print--block">
        <StoryTitle
          title={story.title}
          OnTitleChange={onStoryTitleChnage}
          placeholder={"My printed type story"}
        />
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <Button text={"Next"} />
    </div>
  );
};

export default Print;
