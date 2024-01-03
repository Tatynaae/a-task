import React, { useState } from "react";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Remember from "../../assets/icons/remember";
import "./SignUp.scss";

const SignUp = ({ close }) => {
  const [login, setLogin] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div className="sign-up">
      {login ? (
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
          <form className="sign-up__form">
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <div className="sign-up__form__remember">
              <div className="left" onClick={() => setChecked(!checked)}>
                <div className="left-r">
                  <Remember checked={checked} />
                </div>
                <p>Remember me</p>
              </div>
              <p className="forgot">Forgot password?</p>
            </div>
            <button>Sign in</button>
          </form>
          <p className="sign-up__login">
            Don’t have an account{" "}
            <span onClick={() => setLogin(false)}>Sign Up</span>
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
          <form className="sign-up__form">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <button>Create account</button>
          </form>
          <p className="sign-up__login">
            Already have an account?{" "}
            <span onClick={() => setLogin(true)}>Login</span>
          </p>
        </>
      )}
    </div>
  );
};

export default SignUp;
