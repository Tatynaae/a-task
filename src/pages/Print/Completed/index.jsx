import React, { useState } from "react";
import { useImages } from "../../../context/ImagesContext";
import { ReactComponent as Frame } from "../../../assets/icons/frame-1.svg";
import Button from '../../../components/UI/Button';
import Select from "../../../components/UI/Select";
import StoryTitle from "../../../components/UI/StoryTitle";
import "./Completed.scss";

const Completed = ({ story, BackFromCompleted }) => {
  const { images } = useImages();
  const [quantity, setQuantity] = useState(1);
  const SizeOptions = ["Size: 11*12", "Size: 11*13", "Size: 11*14"];
  const MountOptions = ["Wall mount", "Wall mount 1", "Wall mount 2"];
  const ColorOptioins = [
    "Frame Color : Black",
    "Frame Color : Blue",
    "Frame Color : Yellow",
  ];

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity+=1);
  };
  const decrementQuantity = () => {
    quantity > 1 ? setQuantity((quantity) => quantity-=1) : setQuantity(1);
  };
  return (
    <div className="completed-content">
      <div className="completed-content__title">
        <p>Story Title</p>
        <StoryTitle value={story.StoryTitle} />
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
              <img src={images.firstImage} alt="" />
            </div>
            <div className="left--second">
              <div className="left--second__box">
                <img src={images.secondImage} alt="" />
              </div>
              <div className="left--second__box">
                <img src={images.thirdImage} alt="" />
              </div>
              <div className="left--second__box">
                <img src={images.fourthImage} alt="" />
              </div>
              <div className="left--second__box">
                <img src={images.fifthImage} alt="" />
              </div>
            </div>
          </div>
          <div className="right">
            <p>{story.StoryText}</p>
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
        <Button text={'Back'} onClick={BackFromCompleted}/>
        <Button text={'Add To Cart'} style={{color: '#FBF8C8'}}/>
      </div>
    </div>
  );
};

export default Completed;
