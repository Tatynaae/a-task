import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Frame } from "../../../assets/icons/frame-1.svg";
import SignUp from "../../../components/SignUp";
import Button from "../../../components/UI/Button";
import Select from "../../../components/UI/Select";
import AppOverlay from "../../../components/AppOverlay";
import StoryTitle from "../../../components/UI/StoryTitle";
import "./Completed.scss";
import { usePrintStory } from "../../../context/PrintStoryContext";

const Completed = ({ story, BackFromCompleted }) => {
  const { resetPrintStory } = usePrintStory();
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);

  const savedSignup = localStorage.getItem("signup");
  const savedLogin = localStorage.getItem("login");

  const [quantity, setQuantity] = useState(1);
  const SizeOptions = ["Size: 11*12", "Size: 11*13", "Size: 11*14"];
  const MountOptions = ["Wall mount", "Wall mount 1", "Wall mount 2"];
  const ColorOptioins = [
    "Frame Color : Black",
    "Frame Color : Blue",
    "Frame Color : Yellow",
  ];

  const Close = () => {
    setOverlay(false);
  };
  const Clear = () => {
    resetPrintStory()
  };

  const incrementQuantity = () => {
    setQuantity((quantity) => (quantity += 1));
  };
  const decrementQuantity = () => {
    quantity > 1 ? setQuantity((quantity) => (quantity -= 1)) : setQuantity(1);
  };

  const addToCard = () => {
    if (savedSignup || savedLogin) {
      navigate("/account");
      Clear();
    } else {
      setOverlay(true);
    }
  };
  return (
    <>
      <div className="completed-content">
        <div className="completed-content__title">
          <p>Story Title</p>
          <StoryTitle value={story.title} />
        </div>
        <div className="completed-content__block">
          <div className="framed-content">
            <div className="frame frame-1">
              <Frame />
            </div>
            <div className="frame frame-2">
              <Frame />
            </div>
            <div className="frame frame-3">
              <Frame />
            </div>
            <div className="frame frame-4">
              <Frame />
            </div>

            <div className="left">
              <div className="left--first">
                <img src={story.images[0]} alt="" />
              </div>
              <div className="left--second">
                <div className="left--second__box">
                  <img src={story.images[1]} alt="" />
                </div>
                <div className="left--second__box">
                  <img src={story.images[2]} alt="" />
                </div>
                <div className="left--second__box">
                  <img src={story.images[3]} alt="" />
                </div>
                <div className="left--second__box">
                  <img src={story.images[5]} alt="" />
                </div>
              </div>
            </div>
            <div className="right">
              <p>{story.text}</p>
            </div>
          </div>
        </div>
        <div className="completed-content__title">
          <p>Your printed (TYPE) story framed</p>
          <Select options={SizeOptions} />
          <Select options={MountOptions} />
          <Select options={ColorOptioins} />
          <div className="quantity">
            <div className="quantity--left">
              <div className="box" onClick={decrementQuantity}>
                -
              </div>
              <div className="box">{quantity}</div>
              <div className="box" onClick={incrementQuantity}>
                +
              </div>
            </div>
            <div className="quantity--right">
              <div className="box">{100 * quantity}$</div>
            </div>
          </div>
        </div>
        <div className="completed-content--btns">
          <Button text={"Back"} onClick={BackFromCompleted} />
          <Button
            text={"Add To Cart"}
            style={{ color: "#FBF8C8" }}
            onClick={addToCard}
          />
        </div>
      </div>
      {overlay ? (
        <AppOverlay
          close={Close}
          children={<SignUp close={Close} path={"/account"} clear={Clear} />}
        />
      ) : null}
    </>
  );
};

export default Completed;
