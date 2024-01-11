import React, { useState } from "react";
import StoryTell from "./StoryTell";
import Title from "../../components/UI/Title";
import Button from "../../components/UI/Button";
import StoryType from "../../components/UI/StoryType";
import { ReactComponent as LifeStory } from "../../assets/icons/life-story.svg";
import { ReactComponent as LoveStory } from "../../assets/icons/love-story.svg";
import { ReactComponent as TravelStory } from "../../assets/icons/travel-story.svg";
import "./Main.scss";

const Main = () => {
  const [hero, setHero] = useState("hero");
  const [activeStory, setActiveStory] = useState(null);

  const handleSetActiveStory = (storyId) => {
    setActiveStory(storyId);
  };
  const stories = [
    {
      id: 1,
      title: "Life story",
      description: "Tell the unique story of your life.",
      icon: <LifeStory />,
      relocate: '/'
    },
    {
      id: 2,
      title: "Love story",
      description: "Share your personal love story.",
      icon: <LoveStory />,
      relocate: '/'
    },
    {
      id: 3,
      title: "Travel story",
      description: "Document the story of your travels.",
      icon: <TravelStory />,
      relocate: '/'
    },
  ];

  const ChangeHero = () => {
    setHero("story-tell");
  };

  if (hero !== "hero") return <StoryTell />;
  return (
    <div className="hero">
      <Title text={"What story do you have?"} />
      <div className="hero--stories">
        {stories.map((story) => (
          <StoryType
            variant="default"
            story={story}
            key={story.id}
            setActiveStory={handleSetActiveStory}
            isActive={activeStory === story.id}
          />
        ))}
      </div>
      <Button text={"Next"} onClick={ChangeHero} />
    </div>
  );
};

export default Main;
