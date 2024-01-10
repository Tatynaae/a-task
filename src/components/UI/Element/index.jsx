import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pencil } from "../../../assets/icons/Pencil.svg";
import "./Element.scss";

const Element = ({ el, id, ViewImage, path }) => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const Edit = () => {
    path ? navigate(path) : navigate("/");
  };

  return (
    <div
      key={id}
      className="element"
      onMouseOver={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
      onClick={() => (ViewImage ? ViewImage(el) : "")}
    >
      <div className={edit ? "left-short" : "left"}>
        <img src={el} alt="img" />
        <div className="left--info">
          <h2>Question 1</h2>
          <button>Complete</button>
        </div>
      </div>
      {edit && (
        <div className="right" onClick={Edit}>
          <Pencil />
          Edit
        </div>
      )}
    </div>
  );
};

export default Element;
