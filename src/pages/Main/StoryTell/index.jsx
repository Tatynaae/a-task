import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../../components/UI/Title";
import Button from "../../../components/UI/Button";
import StoryType from "../../../components/UI/StoryType";
import { ReactComponent as AudioType } from "../../../assets/icons/audio-type.svg";
import { ReactComponent as VideoType } from "../../../assets/icons/video-type.svg";
import { ReactComponent as PrintType } from "../../../assets/icons/print-type.svg";
import { ReactComponent as BookType } from "../../../assets/icons/book-type.svg";
import "./StoryTell.scss";

const StoryTell = () => {
  const navigate = useNavigate();
  const [activeStory, setActiveStory] = useState(null);
  const [location, setLocation] = useState(null);

  const handleSetActiveStory = (storyId, path) => {
    setActiveStory(storyId);
    setLocation(path);
  };

  const StartButton = () => {
    navigate(location);
  };
  const StoriesTell = [
    {
      id: 1,
      icon: <AudioType />,
      title: "Audio narration",
      description: "Narrate your {type} story along side personal photos.",
      relocate: "/audio",
    },
    {
      id: 2,
      icon: <VideoType />,
      title: "Video biography",
      description: "Record yourself telling your {type} story.",
      relocate: "/video",
    },
    {
      id: 3,
      icon: <PrintType />,
      title: "Print story",
      description: "Capture your {type} story in art to display & rembember.",
      relocate: "/print",
    },
    {
      id: 4,
      icon: <BookType />,
      title: "Story book",
      description: "Document your {type} story in a beautiful printed book.",
      relocate: "/book",
    },
  ];
  return (
    <div className="story-tell">
      <Title text={"How do you want to tell your story?"} />
      <div className="story-tell--content">
        {StoriesTell.map((el) => (
          <StoryType
            story={el}
            variant="white"
            key={el.id}
            setActiveStory={handleSetActiveStory}
            isActive={activeStory === el.id}
          />
        ))}
      </div>
      <Button text={"Start telling my story"} onClick={StartButton} />
    </div>
  );
};

export default StoryTell;
