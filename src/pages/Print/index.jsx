import React, { useState } from "react";
import { useImages } from "../../context/ImagesContext";
import Completed from "./Completed";
import Title from "../../components/UI/Title";
import Button from "../../components/UI/Button";
import FileInput from "../../components/FileInput";
import AppOverlay from "../../components/AppOverlay";
import StoryType from "../../components/UI/StoryType";
import StoryTitle from "../../components/UI/StoryTitle";
import PreviewModal from "../../components/PreviewModal";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { ReactComponent as Up } from "../../assets/icons/up-arrow.svg";
import { ReactComponent as Upload } from "../../assets/icons/Upload.svg";
import { ReactComponent as Down } from "../../assets/icons/down-arrow.svg";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { ReactComponent as Image } from "../../assets/icons/Image (Single).svg";
import { ReactComponent as FirstFrame } from "../../assets/icons/first-frame.svg";
import { ReactComponent as ThirdFrame } from "../../assets/icons/third-frame.svg";
import { ReactComponent as SecondFrame } from "../../assets/icons/second-frame.svg";

import "./Print.scss";

const Print = () => {
  const { images, setImages } = useImages();
  const [overlay, setOverlay] = useState(false);
  const [file, setFile] = useState(null);
  const [storyStyle, setStoryStyle] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(false);
  const [frame, setFrame] = useState(false);
  const [activeFrame, setActiveFrame] = useState(null);
  const [completed, setCompoleted] = useState(false);

  const OnImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      OpenOverlay();
    } else setOverlay(false);
  };
  const [story, setStory] = useState({
    StoryTitle: "",
    StoryText: "",
    StoryStyle: "",
    StoryImages: {
      storyFirstImage: images.firstImage,
      storySecondImage: images.secondImage,
      storyThirdImage: images.thirdImage,
      storyFourthImage: images.fourthImage,
      storyFifthImage: images.fifthImage,
    },
  });
  const styles = ["Style #1", "Style #2", "Style #3"];
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };

  const onStoryTitleChnage = (e) => {
    setStory({ ...story, StoryTitle: e.target.value });
  };

  const photos = [
    {
      id: 1,
      icon: <Image />,
      image: images.firstImage,
    },
    {
      id: 2,
      icon: <Image />,
      image: images.secondImage,
    },
    {
      id: 3,
      icon: <Image />,
      image: images.thirdImage,
    },
    {
      id: 4,
      icon: <Image />,
      image: images.fourthImage,
    },
    // {
    //   id: 5,
    //   icon: <Image />,
    //   image: images.fifthImage,
    // },
  ];

  const Cencel = () => {
    setOverlay(false);
    setFile(null);
  };

  const RemoveImage = (id) => {
    if (id === 1) {
      setImages({ ...images, firstImage: null });
    } else if (id === 2) {
      setImages({ ...images, secondImage: null });
    } else if (id === 3) {
      setImages({ ...images, thirdImage: null });
    } else if (id === 4) {
      setImages({ ...images, fourthImage: null });
    } else if (id === 5) {
      setImages({ ...images, fifthImage: null });
    }
  };

  const SetStyle = (el) => {
    setSelectedStyle(true);
    setStory({ ...story, StoryStyle: el });
  };

  const handleChangeStyleSelect = () => {
    setSelectedStyle(!selectedStyle);
  };

  const able =
    story.StoryText &&
    story.StoryTitle &&
    images.firstImage &&
    images.secondImage &&
    images.thirdImage &&
    images.fourthImage &&
    images.fifthImage;

  const DisplayStoryStyle = () => {
    able && setStoryStyle(true);
    // setStoryStyle(true);
  };

  const Back = () => {
    setStory({ ...story, StoryStyle: "" });
    setStoryStyle(false);
  };
  const NextToFrame = () => {
    story.StoryStyle && able && setFrame(true);
    // setFrame(true)
  };

  const frames = [
    {
      id: 1,
      title: "Classic frame",
      description: "Display your story in an elegant matted wood frame",
      icon: <FirstFrame />,
    },
    {
      id: 2,
      title: "Classic frame",
      description: "Display your story in an elegant matted wood frame",
      icon: <SecondFrame />,
    },
    {
      id: 3,
      title: "Classic frame",
      description: "Display your story in an elegant matted wood frame",
      icon: <ThirdFrame />,
    },
  ];

  const ActivateFrame = (id) => {
    setActiveFrame(id);
  };

  const NextToCompleted = () => {
    activeFrame && setCompoleted(true);
    // setCompoleted(true)
  };
  const BackFromCompleted = () => {
    setCompoleted(!completed);
  };

  if (completed) {
    return <Completed story={story} BackFromCompleted={BackFromCompleted} />;
  }
  if (frame) {
    return (
      <div className="frame-content">
        <Title text={"How do you want to print your (type) story?"} />
        <div className="frame-content__frames">
          {frames.map((frame) => (
            <StoryType
              story={frame}
              variant="default"
              isActive={activeFrame === frame.id}
              setActiveStory={ActivateFrame}
            />
          ))}
        </div>
        <div className="frame-content--btns">
          <div className="frame-content--btns__btn">
            <Button text={"Back"} onClick={() => setFrame(false)} />
          </div>
          <div className="frame-content--btns__btn">
            <Button
              text={"Next"}
              onClick={NextToCompleted}
              disabled={!activeFrame}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="print">
        <Title text={"Your printed [Type] Story!"} />

        <div className="print--block">
          <StoryTitle
            title={story.title}
            OnTitleChange={onStoryTitleChnage}
            placeholder={"My printed type story"}
          />
          {storyStyle && (
            <div
              className={
                story.StoryStyle ? "storyStyleSelectOpened" : "storyStyleSelect"
              }
              onClick={handleChangeStyleSelect}
            >
              <label htmlFor="storyStyle">
                {story.StoryStyle
                  ? story.StoryStyle
                  : "Select a style for your story:"}
              </label>
              <div>{selectedStyle ? <Up /> : <Down />}</div>
              {selectedStyle && (
                <ul className="list">
                  {styles.map((style) => (
                    <li onClick={() => SetStyle(style)}>{style}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="print--block__bottom">
            <div className="print--block__bottom__left">
              <div className="left">
                {images.fifthImage === null ? (
                  <>
                    <p>0/5</p>
                    <div className="left--upload">
                      <Upload />
                      <label htmlFor="upload">Upload preview</label>
                      <FileInput id="upload" hidden onChange={OnImageChange} />
                    </div>
                  </>
                ) : (
                  <div className="image">
                    <img
                      src={images.fifthImage}
                      alt="#"
                      onClick={() => setOverlay(true)}
                    />
                    <div
                      className="remove"
                      onClick={() => setImages({ ...images, fifthImage: null })}
                    >
                      <X />
                    </div>
                  </div>
                )}
              </div>
              <div className="right">
                {photos.map((el) => (
                  <div className="right--box" key={el.id}>
                    {el.id !== 5 && el.image !== null && (
                      <div className="image">
                        <img
                          src={el.image}
                          alt="#"
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          className="remove"
                          onClick={() => RemoveImage(el.id)}
                        >
                          <X />
                        </div>
                      </div>
                    )}
                    {el.id !== 5 && el.image === null && el.icon}
                  </div>
                ))}
              </div>
            </div>
            <div className="print--block__bottom__right">
              <textarea
                className="text-area"
                placeholder="Tell your story"
                onChange={(e) =>
                  setStory({ ...story, StoryText: e.target.value })
                }
              ></textarea>
              <Question />
            </div>
          </div>
        </div>
        {!storyStyle && (
          <Button text={"Next"} disabled={!able} onClick={DisplayStoryStyle} />
        )}
        {storyStyle && (
          <div className="print--btns">
            <div className="print--btns__btn">
              <Button text={"Back"} onClick={Back} />
            </div>
            <div className="print--btns__btn">
              <Button
                text={"Next"}
                disabled={!story.StoryStyle}
                onClick={NextToFrame}
              />
            </div>
          </div>
        )}
      </div>
      {overlay && <AppOverlay close={CloseOverlay} />}
      {file && overlay && (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal image={file} close={CloseOverlay} cencel={Cencel} />
          }
        />
      )}
    </>
  );
};

export default Print;
