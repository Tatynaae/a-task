import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/Button";
import AppOverlay from "../../../components/AppOverlay";
import StoryTitle from "../../../components/UI/StoryTitle";
import PreviewModal from "../../../components/PreviewModal";
import UploadLarge from "../../../components/UI/UploadLarge";
import { ReactComponent as Image } from "../../../assets/icons/Image (Single).svg";
import { ReactComponent as X } from "../../../assets/icons/x.svg";

import "./FirstQuestion.scss";

const FirstQuestion = ({ setBookStory, bookStory, able }) => {
  const [overlay, setOverlay] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
    setImageFile(null);
  };

  const handleTextChange = (e) => {
    setBookStory({ ...bookStory, text: e.target.value });
  };

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(URL.createObjectURL(e.target.files[0]));
      OpenOverlay();
    } else setOverlay(false);
  };

  const CencelPreviewModal = () => {
    setOverlay(false);
    setImageFile(null);
  };

  const SavePreviewModal = (croppedImage) => {
    const updatedBook = { ...bookStory };
    const nullIndex = updatedBook.images.findIndex((image) => image === null);

    if (nullIndex !== -1) {
      updatedBook.images[nullIndex] = croppedImage;

      setBookStory(updatedBook);
      setImageFile(null);
      CloseOverlay();
    } else {
      console.error("No more slots available for images");
    }
  };

  const PublishStory = () => {
    able && navigate("/publish-book_story");
  };

  return (
    <>
      <div className="first-question">
        <div className="first-question__content">
          <p>Question 1</p>
          <StoryTitle
            OnTitleChange={handleTextChange}
            placeholder={"Pre filled text here for question #1"}
          />
          <div className="images-block">
            <div className="images-block__left">
              <UploadLarge
                image={imageFile || bookStory.images[4]}
                ChangeImage={handleChangeImage}
                // RemoveImage={RemoveImage(0)}
              />
            </div>
            <div className="images-block__right">
              <div className="box">
                {bookStory.images[0] ? (
                  <>
                    <img src={bookStory.images[0]} alt="" />
                    <div className="remove">
                      <X />
                    </div>
                  </>
                ) : (
                  <Image />
                )}
              </div>
              <div className="box">
                {bookStory.images[1] ? (
                  <>
                    <img src={bookStory.images[1]} alt="" />
                    <div className="remove">
                      <X />
                    </div>
                  </>
                ) : (
                  <Image />
                )}
              </div>
              <div className="box">
                {bookStory.images[2] ? (
                  <>
                    <img src={bookStory.images[2]} alt="" />
                    <div className="remove">
                      <X />
                    </div>
                  </>
                ) : (
                  <Image />
                )}
              </div>
              <div className="box">
                {bookStory.images[3] ? (
                  <>
                    <img src={bookStory.images[3]} alt="" />
                    <div className="remove">
                      <X />
                    </div>
                  </>
                ) : (
                  <Image />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="btns">
          <Button text={"Next question"} onClick={PublishStory} disabled={!able}/>
          <Button text={"Skip question"} variant="withoutBackgroundColor" />
        </div>
      </div>
      {overlay && imageFile ? (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal
              close={CloseOverlay}
              cencel={CencelPreviewModal}
              image={imageFile}
              save={SavePreviewModal}
            />
          }
        />
      ) : null}
    </>
  );
};

export default FirstQuestion;
