import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ReactComponent as Profile} from '../../assets/icons/Profile.svg'
import Logo from "../../assets/images/logo.svg";
import AppOverlay from "../AppOverlay";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [overlay, setOverlay] = useState(false);
  const OpenOverlay = () => {
    setOverlay(true);
  };
  const CloseOverlay = () => {
    setOverlay(false);
  };

  console.log(location.pathname);
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={Logo} alt="logo" />
            <span className="logo-title">StoryFairy</span>
          </div>
          {location.pathname === "/" ? (
            <button className="save" onClick={OpenOverlay}>
              Save Your Story
            </button>
          ) : (
            <Profile />
          )}
        </div>
      </header>
      {overlay && <AppOverlay close={CloseOverlay} />}
    </>
  );
};

export default Header;
