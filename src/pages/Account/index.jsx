import React from "react";
import image from "../../assets/images/memoir.svg";
import { ReactComponent as Edit } from "../../assets/icons/acc-edit.svg";
import { ReactComponent as Delete } from "../../assets/icons/acc-trash.svg";
import { ReactComponent as Plus } from "../../assets/icons/acc-plus.svg";
import { ReactComponent as Load } from "../../assets/icons/acc-load.svg";
import "./Account.scss";

const Account = () => {
  const status = [
    { title: "In process", color: "#4d6fc6" },
    { title: "Completed", color: "#5CA450" },
    { title: "Ordered", color: "#6642A0" },
  ];
  return (
    <div className="account-container">
      <h1>Your stories</h1>
      <div className="account-container__block">
        <div className="account-container__block--element">
          <div className="left-side">
            <img src={image} alt="" />
          </div>
          <div className="right-side">
            <div className="right-side__texts">
              <h2>Memoir of memories</h2>
              <p>The video biography of your type story.</p>
              <button
                className="status"
                style={{
                  backgroundColor: status[0].color,
                }}
              >
                {status[0].title}
              </button>
            </div>
            <div className="right-side__icons">
              <div className="icons">
                <Delete />
                <Plus />
                <Edit />
              </div>
            </div>
          </div>
        </div>
        <div className="account-container__block--element">
          <div className="left-side">
            <img src={image} alt="" />
          </div>
          <div className="right-side">
            <div className="right-side__texts">
              <h2>Memoir of memories</h2>
              <p>The video biography of your type story.</p>
              <button
                className="status"
                style={{
                  backgroundColor: status[1].color,
                }}
              >
                {status[1].title}
              </button>
            </div>
            <div className="right-side__icons">
              <div className="icons">
                <Delete />
                <Plus />
                <Load />
              </div>
              <div className="btns">
                <button className="btns--left">Order</button>
              </div>
            </div>
          </div>
        </div>
        <div className="account-container__block--element">
          <div className="left-side">
            <img src={image} alt="" />
          </div>
          <div className="right-side">
            <div className="right-side__texts">
              <h2>Memoir of memories</h2>
              <p>The video biography of your type story.</p>
              <button
                className="status"
                style={{
                  backgroundColor: status[2].color,
                }}
              >
                {status[2].title}
              </button>
            </div>
            <div className="right-side__icons">
              <div className="icons">
                <Delete />
                <Plus />
                <Load />
              </div>
              <div className="btns">
                <div className="btns--re-order">Re-order</div>
                <button className="btns--left">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
