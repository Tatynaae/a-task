import React, { useState, useEffect } from "react";
import { useSignUp } from "../../context/SingUpContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Profile } from "../../assets/icons/Profile.svg";
import AppOverlay from "../AppOverlay";
import Logo from "../../assets/images/logo.svg";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { signup, login, setSignup, setLogin } = useSignUp();
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const savedSignup = localStorage.getItem("signup");
    const savedLogin = localStorage.getItem("login");

    if (savedSignup) {
      setSignup(JSON.parse(savedSignup));
    }

    if (savedLogin) {
      setLogin(JSON.parse(savedLogin));
    }
  }, [setSignup, setLogin]);

  const saveToLocalStorage = () => {
    localStorage.setItem("signup", JSON.stringify(signup));
    localStorage.setItem("login", JSON.stringify(login));
  };

  const OpenOverlay = () => {
    setOverlay(true);
  };

  const CloseOverlay = () => {
    setOverlay(false);
  };

  const savedSignup = localStorage.getItem("signup");
  const savedLogin = localStorage.getItem("login");

  const logined =
    (savedSignup &&
      Object.values(JSON.parse(savedSignup))
        .map((el) => el !== "")
        .includes(true)) ||
    (savedLogin &&
      Object.values(JSON.parse(savedLogin))
        .map((el) => el !== "")
        .includes(true));

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={Logo} alt="logo" />
            <span className="logo-title">StoryFairy</span>
          </div>
          {logined ? (
            <div
              onClick={() => navigate("/account")}
              style={{ cursor: "pointer" }}
            >
              <Profile />
            </div>
          ) : (
            <button
              className="save"
              onClick={() => {
                OpenOverlay();
                saveToLocalStorage();
              }}
            >
              Save Your Story
            </button>
          )}
        </div>
      </header>
      {overlay && <AppOverlay close={CloseOverlay} />}
    </>
  );
};

export default Header;
