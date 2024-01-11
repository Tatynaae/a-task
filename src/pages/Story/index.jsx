import React, { useState } from "react";
import FirstQuestion from "./FirstQuestion";
import Title from "../../components/UI/Title";
import Select from "../../components/UI/Select";
import Button from "../../components/UI/Button";
import AppOverlay from "../../components/AppOverlay";
import StoryTitle from "../../components/UI/StoryTitle";
import PreviewModal from "../../components/PreviewModal";
import UploadLarge from "../../components/UI/UploadLarge";
import { useBookStory } from "../../context/BookStoryContext";

import "./Story.scss";

const Story = () => {
  const options = ["Style #1", "Style #2", "Style #3"];
  const [overlay, setOverlay] = useState(false);
  const [nextSection, setNextSection] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const { bookStory, setBookStory } = useBookStory();

  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
    setPreviewFile(null);
  };

  const handleChangeTitle = (e) => {
    setBookStory({ ...bookStory, title: e.target.value });
  };
  const handleChangeStyle = (option) => {
    setBookStory({ ...bookStory, style: option });
  };
  const handleChangePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewFile(URL.createObjectURL(e.target.files[0]));
      OpenOverlay();
    } else setOverlay(false);
  };

  const CencelPreviewModal = () => {
    setOverlay(false);
    setPreviewFile(null);
  };
  const SavePreviewModal = (croppedImage) => {
    setBookStory({ ...bookStory, preview: croppedImage });
    setOverlay(false);
    setPreviewFile(null);
  };

  const RemoveImage = () => {
    setBookStory({ ...bookStory, preview: null });
  };

  const able = bookStory.preview && bookStory.style && bookStory.title;
  const AllAble = able && bookStory.text && bookStory.images;

  const NextSectionChange = () => {
    able && setNextSection(true);
  };
  if (nextSection) {
    return (
      <FirstQuestion
        setBookStory={setBookStory}
        bookStory={bookStory}
        able={AllAble}
      />
    );
  }
  return (
    <>
      <div className="story-container">
        <Title text={"Your (Type) Story Book"} />
        <div className="story--content">
          <div className="story--content__left content">
            <p>Preview</p>
            <UploadLarge
              image={bookStory.preview}
              RemoveImage={RemoveImage}
              ChangeImage={handleChangePreview}
            />
          </div>
          <div className="story--content__right content">
            <p>Enter title and choose a style</p>
            <StoryTitle
              placeholder={"My {type} story."}
              OnTitleChange={handleChangeTitle}
            />
            <Select options={options} changeStyle={handleChangeStyle} />
          </div>
        </div>
        <div className="story--content__btn">
          <Button
            text={"First question"}
            disabled={!able}
            onClick={NextSectionChange}
          />
        </div>
      </div>
      {overlay && previewFile ? (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal
              close={CloseOverlay}
              cencel={CencelPreviewModal}
              image={previewFile}
              save={SavePreviewModal}
            />
          }
        />
      ) : null}
    </>
  );
};

export default Story;
