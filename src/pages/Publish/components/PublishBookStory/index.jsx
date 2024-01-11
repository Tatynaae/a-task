import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookStory } from "../../../../context/BookStoryContext";
import { ReactComponent as Image } from "../../../../assets/icons/Image (Single).svg";
import Button from "../../../../components/UI/Button";
import Element from "../../../../components/UI/Element";
import StoryTitle from "../../../../components/UI/StoryTitle";
import "./PublishBookStory.scss";

const PublishBookStory = () => {
  const { bookStory } = useBookStory();
  const navigate = useNavigate();
  return (
    <div className="publishBookStory">
      <div className="publishBookStory--content">
        <StoryTitle value={bookStory.title} />
        <div className="block">
          <div className="block--left">
            <div className="block--left__left">
              <div className="box">
                {bookStory.images[0] ? (
                  <img src={bookStory.images[4]} alt="" />
                ) : (
                  <Image />
                )}
              </div>
            </div>

            <div className="block--left__right">
              <div className="box">
                {bookStory.images[0] ? (
                  <img src={bookStory.images[0]} alt="" />
                ) : (
                  <Image />
                )}
              </div>
              <div className="box">
                {bookStory.images[1] ? (
                  <img src={bookStory.images[1]} alt="" />
                ) : (
                  <Image />
                )}
              </div>
              <div className="box">
                {bookStory.images[2] ? (
                  <img src={bookStory.images[2]} alt="" />
                ) : (
                  <Image />
                )}
              </div>
              <div className="box">
                {bookStory.images[3] ? (
                  <img src={bookStory.images[3]} alt="" />
                ) : (
                  <Image />
                )}
              </div>
            </div>
          </div>
          <div className="block--right">
            <p>{bookStory.text}</p>
          </div>
        </div>
      </div>
      <div className="publishBookStory--content">
        <div className="elements">
          {bookStory.images.map((el, idx) => (
            <Element el={el} id={idx} path={"/book-story"} />
          ))}
        </div>
      </div>

      <Button
        onClick={() => navigate("/account")}
        text={"Publish Book"}
        style={{
          color: "#FBF8C8",
          margin: "30px 0 0 0 ",
        }}
      />
    </div>
  );
};

export default PublishBookStory;
