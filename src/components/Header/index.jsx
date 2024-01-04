import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import AppOverlay from "../AppOverlay";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={Logo} alt="logo" />
            <span className="logo-title">StoryFairy</span>
          </div>
          <button className="save" onClick={OpenOverlay}>
            Save Your Story
          </button>
        </div>
      </header>
      {overlay && <AppOverlay close={CloseOverlay} />}
    </>
  );
};

export default Header;
