import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudioStory } from "../../context/AudioStoryContext";
import { ReactComponent as Upload } from "../../assets/icons/Upload.svg";
import { ReactComponent as Image } from "../../assets/icons/Image (Single).svg";
import { ReactComponent as Record } from "../../assets/icons/record.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import VoiceRecorder from "../../components/VoiceRecorder";
import PreviewModal from "../../components/PreviewModal";
import AppOverlay from "../../components/AppOverlay";
import StoryTitle from "../../components/UI/StoryTitle";
import FileInput from "../../components/FileInput";
import Button from "../../components/UI/Button";
import "./Audio.scss";

const Audio = () => {
  const navigate = useNavigate();
  const { audioStory, setAudioStory } = useAudioStory();
  const [startRecord, setStartRecord] = useState(false);
  const [file, setFile] = useState(null);
  const [overlay, setOverlay] = useState(false);

  const OnTitleChange = (e) => {
    setAudioStory({ ...audioStory, title: e.target.value });
  };
  const photos = [
    {
      id: 0,
      icon: <Image />,
      image: audioStory.images[0],
    },
    {
      id: 1,
      icon: <Image />,
      image: audioStory.images[1],
    },
    {
      id: 2,
      icon: <Image />,
      image: audioStory.images[2],
    },
    {
      id: 3,
      icon: <Image />,
      image: audioStory.images[3],
    },
  ];
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

  const removeImage = (index) => {
    const updatedImages = [...audioStory.images];
    updatedImages[index] = null;

    // Update the state with the new images array
    setAudioStory({
      ...audioStory,
      images: updatedImages,
    });
  };

  const SavePreviewModal = (croppedImage) => {
    const updatedBook = { ...audioStory };
    const nullIndex = updatedBook.images.findIndex((image) => image === null);

    if (nullIndex !== -1) {
      updatedBook.images[nullIndex] = croppedImage;

      setAudioStory(updatedBook);
      setFile(null);
      CloseOverlay();
    } else {
      console.error("No more slots available for images");
    }
  };

  const Cencel = () => {
    setFile(null);
    CloseOverlay();
  };

  useEffect(() => {
    setFile(null);
  }, []);

  let able =
    audioStory.images[0] !== null &&
    audioStory.images[1] !== null &&
    audioStory.images[2] !== null &&
    audioStory.images[4] !== null &&
    audioStory.title;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const Start = () => {
    setStartRecord(true);
  };

  const nextNavigate = () => {
    audioStory.audio && navigate("/publish-images");
  };

  return (
    <>
      <section className="audio-container">
        <form className="question" onSubmit={handleSubmit}>
          <h2 className="question--title">Question 1</h2>
          <StoryTitle
            placeholder={"Pre filled text here for question #1"}
            OnTitleChange={OnTitleChange}
          />
          <div className="question--story-create">
            <div className="question--story-create__left">
              {audioStory.images[4] === null ? (
                <>
                  <p>0/5</p>
                  <div className="question--story-create__left--upload">
                    <Upload />
                    <label htmlFor="upload">Upload preview</label>
                    <FileInput id="upload" hidden onChange={OnImageChange} />
                  </div>
                </>
              ) : (
                <div className="image">
                  <img
                    src={audioStory.images[4] || file}
                    alt="#"
                    onClick={() => setOverlay(true)}
                  />
                  <div className="remove" onClick={() => removeImage(4)}>
                    <X />
                  </div>
                </div>
              )}
            </div>
            <div className="question--story-create__right">
              <div className="top">
                {photos.map((el) => (
                  <div className="top--box" key={el.id}>
                    {el.id !== 4 && el.image !== null && (
                      <div className="image">
                        <img src={el.image} alt="#" />
                        <div
                          className="remove"
                          onClick={() => removeImage(el.id)}
                        >
                          <X />
                        </div>
                      </div>
                    )}
                    {el.id !== 5 && el.image === null && el.icon}
                  </div>
                ))}
              </div>
              <div className="record">
                {!startRecord && audioStory.audio === null ? (
                  <button
                    disabled={!able}
                    onClick={Start}
                    className={!able ? "disable" : "record-button"}
                  >
                    <Record />
                    Record
                  </button>
                ) : (
                  <VoiceRecorder
                    able={!able}
                    startRecord={startRecord}
                    setStartRecord={setStartRecord}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="btns">
          <Button
            disabled={!audioStory.audio}
            text={"Next question"}
            onClick={nextNavigate}
          />
          <Button text={"Skip  question"} variant="withoutBackgroundColor" />
        </div>
      </section>
      {file && overlay && (
        <AppOverlay
          close={CloseOverlay}
          children={
            <PreviewModal
              image={file}
              close={CloseOverlay}
              cencel={Cencel}
              save={SavePreviewModal}
            />
          }
        />
      )}
    </>
  );
};

export default Audio;
