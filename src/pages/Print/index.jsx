import React, { useState } from "react";
import { usePrintStory } from "../../context/PrintStoryContext";
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
  const { printStory, setPrintStory } = usePrintStory();
  const [overlay, setOverlay] = useState(false);
  const [file, setFile] = useState(null);
  const [storyStyle, setStoryStyle] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(false);
  const [frame, setFrame] = useState(false);
  const [activeFrame, setActiveFrame] = useState(null);
  const [completed, setCompoleted] = useState(false);
  const styles = ["Style #1", "Style #2", "Style #3"];

  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };
  const OnImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      OpenOverlay();
    } else setOverlay(false);
  };

  const onStoryTitleChnage = (e) => {
    setPrintStory({ ...printStory, title: e.target.value });
  };

  const photos = [
    {
      id: 1,
      icon: <Image />,
      image: printStory.images[0],
    },
    {
      id: 2,
      icon: <Image />,
      image: printStory.images[1],
    },
    {
      id: 3,
      icon: <Image />,
      image: printStory.images[2],
    },
    {
      id: 4,
      icon: <Image />,
      image: printStory.images[3],
    },
  ];

  const Cencel = () => {
    setOverlay(false);
    setFile(null);
  };

  const SetStyle = (el) => {
    setSelectedStyle(true);
    setPrintStory({ ...printStory, style: el });
  };

  const handleChangeStyleSelect = () => {
    setSelectedStyle(!selectedStyle);
  };

  const DisplayStoryStyle = () => {
    able && setStoryStyle(true);
  };
  const able = printStory.title && printStory.images[0] && printStory.text; //nado zakonchit'

  const Back = () => {
    setPrintStory({ ...printStory, style: "" });
    setStoryStyle(false);
  };
  const NextToFrame = () => {
    printStory.style && able && setFrame(true);
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
  };
  const BackFromCompleted = () => {
    setCompoleted(!completed);
  };

  const SaveImage = (croppedImage) => {
    const updatedBook = { ...printStory };
    const nullIndex = updatedBook.images.findIndex((image) => image === null);

    if (nullIndex !== -1) {
      updatedBook.images[nullIndex] = croppedImage;

      setPrintStory(updatedBook);
      setFile(null);
    } else {
      console.error("No more slots available for images");
    }
  };

  if (completed) {
    return (
      <Completed story={printStory} BackFromCompleted={BackFromCompleted} />
    );
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
            title={printStory.title}
            OnTitleChange={onStoryTitleChnage}
            placeholder={"My printed type story"}
          />
          {storyStyle && (
            <div
              className={
                printStory.style ? "storyStyleSelectOpened" : "storyStyleSelect"
              }
              onClick={handleChangeStyleSelect}
            >
              <label htmlFor="storyStyle">
                {printStory.style
                  ? printStory.style
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
                {printStory.images[4] === null ? (
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
                      src={printStory.images[4]}
                      alt="#"
                      onClick={() => setOverlay(true)}
                    />
                    <div
                      className="remove"
                      // onClick={() =>
                      //   setPrintStory({
                      //     ...printStory,
                      //     images: images[0].replace(null),
                      //   })
                      // }
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
                          // onClick={() => RemoveImage(el.id)}
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
                  setPrintStory({ ...printStory, text: e.target.value })
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
                disabled={!printStory.style}
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
            <PreviewModal
              image={file}
              close={CloseOverlay}
              cencel={Cencel}
              save={SaveImage}
            />
          }
        />
      )}
    </>
  );
};

export default Print;
