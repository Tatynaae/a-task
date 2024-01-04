import React from "react";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { ReactComponent as Share1 } from "../../assets/icons/share1.svg";
import { ReactComponent as Share2 } from "../../assets/icons/share2.svg";
import image from "../../assets/images/preview-image.png";

import "./Account.scss";

const Account = () => {
  return (
    <section className="account-container">
      <div className="story-title">
        <p>Story Title</p>
        <div className="story-title__text">
          <p>Story title</p>
          <Question />
        </div>
      </div>
      <div className="story-block">
        <div className="story-block__left">
          <p>Preview</p>
          <div className="image">
            <img src={image} alt="#" />
            <div
              className="remove"
              // onClick={() => setImages({ ...images, fifthImage: null })}
            ></div>
          </div>
        </div>
        <div className="story-block__right">
          <p> Your audio narration will be saved your account for 30 days.</p>
          <div className="share">
            <Share1 />
            <div className="share__text">
              <h3>Share </h3>
              <p>Post your story to your social media for FREE</p>
            </div>
          </div>
          <div className="share">
            <Share2 />
            <div className="share__text">
              <h3>Share Your  Feedback </h3>
              <p>Let us know your thoughts and get (promotion)</p>
            </div>
          </div>
        </div>
      </div>
      <button className="order">Order high res</button>
    </section>
  );
};

export default Account;
