/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { useSignUp } from "../../context/SingUpContext";
import Remember from "../../assets/icons/remember";
import "./SignUp.scss";

const SignUp = ({ close }) => {
  const navigate = useNavigate();
  const { signup, setSignup, login, setLogin } = useSignUp();
  const [loginForm, setLoginForm] = useState(false);
  const [checked, setChecked] = useState(false);
  let ableSingup =
    signup.firstName.length > 0 &&
    signup.lastName.length > 0 &&
    signup.email.length > 0 &&
    signup.password.length > 0;
  let ableLogin = login.email.length > 0 && login.password.length > 0;

  const handleSingUpChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: [value] });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const Relocate = () => {
    navigate("/account");
  };
  const SignUp = () => {
    ableSingup && Relocate();
  };
  const Login = () => {
    ableLogin && Relocate();
  };

  return (
    <div className="sign-up">
      {loginForm ? (
        <>
          <div className="sign-up__head">
            <p>Login</p>
            <div className="close" onClick={close}>
              <Close />
            </div>
          </div>
          <div className="sign-up__desc">
            <h1>Sign in</h1>
            <p>
              Hello again! Log in to your account using your email address and
              password
            </p>
          </div>
          <form className="sign-up__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              onChange={(e) => handleLoginChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleLoginChange(e)}
            />
            <div className="sign-up__form__remember">
              <div className="left" onClick={() => setChecked(!checked)}>
                <div className="left-r">
                  <Remember checked={checked} />
                </div>
                <p>Remember me</p>
              </div>
              <p className="forgot">Forgot password?</p>
            </div>
            <button
              onClick={Login}
              disabled={!ableLogin}
              className={!ableLogin && "disabled"}
            >
              Sign in
            </button>
          </form>
          <p className="sign-up__login">
            Don’t have an account{" "}
            <span onClick={() => setLoginForm(false)}>Sign Up</span>
          </p>
        </>
      ) : (
        <>
          <div className="sign-up__head">
            <p>Sign Up</p>
            <div className="close" onClick={close}>
              <Close />
            </div>
          </div>
          <div className="sign-up__desc">
            <h1>Create an Account</h1>
            <p>
              Create your free Forever Studios account here to save, edit,
              download, and share your story.
            </p>
          </div>
          <form className="sign-up__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={(e) => handleSingUpChange(e)}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              onChange={(e) => handleSingUpChange(e)}
            />
            <input
              type="email"
              placeholder="Email address"
              name="email"
              onChange={(e) => handleSingUpChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleSingUpChange(e)}
            />
            <button
              onClick={SignUp}
              disabled={!ableSingup}
              className={!ableSingup && "disabled"}
            >
              Create account
            </button>
          </form>
          <p className="sign-up__login">
            Already have an account?{" "}
            <span onClick={() => setLoginForm(true)}>Login</span>
          </p>
        </>
      )}
    </div>
  );
};

export default SignUp;
