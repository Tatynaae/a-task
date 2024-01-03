import React, { useState } from "react";
import { ReactComponent as Pencil } from "../../assets/icons/Pencil.svg";
import "./Element.scss";
const Element = ({ el, id }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div
      key={id}
      className="element"
      onMouseOver={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
    >
      <div className={edit ? "left-short" : "left"}>
        <img src={el} alt="img" />
        <div className="left--info">
          <h2>Question 1</h2>
          <button>Complete</button>
        </div>
      </div>
      {edit && (
        <div className="right">
          <Pencil />
          Edit
        </div>
      )}
    </div>
  );
};

export default Element;
