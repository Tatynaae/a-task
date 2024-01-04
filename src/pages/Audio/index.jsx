import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { ReactComponent as Upload } from "../../assets/icons/Upload.svg";
import { ReactComponent as Image } from "../../assets/icons/Image (Single).svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { useImages } from "../../context/ImagesContext";
import { useSourse } from "../../context/SourseContext";
import VoiceRecorder from "../../components/VoiceRecorder";
import PreviewModal from "../../components/PreviewModal";
import AppOverlay from "../../components/AppOverlay";
import FileInput from "../../components/FileInput";
import "./Audio.scss";

const Audio = () => {
  const navigate = useNavigate();
  const { images, setImages } = useImages();
  const [startRecord, setStartRecord] = useState(false);
  const { sourse } = useSourse();
  const [file, setFile] = useState(null);
  const [title, SetTitle] = useState("");
  const [overlay, setOverlay] = useState(false);

  const OnTitleChange = (e) => {
    SetTitle(e.target.value);
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
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
    setFile(null);
  };

  const OnImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      OpenOverlay();
    } else setOverlay(false);
  };

  const Cencel = () => {
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

  useEffect(() => {
    setFile(null);
  }, []);

  let able = false;
  let a = Object.values(images);
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] === null) {
      able = true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="audio-container">
        <form className="question" onSubmit={handleSubmit}>
          <h2 className="question--title">Question 1</h2>
          <div className="question--story-title">
            <input
              type="text"
              className=""
              placeholder="Pre filled text here for question #1"
              onChange={(e) => OnTitleChange(e)}
              value={title}
            />
            <Question />
          </div>
          <div className="question--story-create">
            <div className="question--story-create__left">
              {images.fifthImage === null ? (
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
            <div className="question--story-create__right">
              <div className="top">
                {photos.map((el) => (
                  <div className="top--box" key={el.id}>
                    {el.id !== 5 && el.image !== null && (
                      <div className="image">
                        <img src={el.image} alt="#" />
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
              <div className="record">
                <VoiceRecorder able={able} startRecord={startRecord} setStartRecord={setStartRecord}/>
              </div>
            </div>
          </div>
        </form>
        {!able && sourse.audio !== null ? (
          <button className="next" onClick={() => navigate("/publish")}>
            Next question
          </button>
        ) : (
          ""
        )}
        {!able && sourse.audio !== null ? (
          <button className="skip">Skip question</button>
        ) : (
          ""
        )}
      </section>
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

export default Audio;
