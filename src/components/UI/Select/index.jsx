import React, { useState } from "react";
import { ReactComponent as Up } from "../../../assets/icons/up-arrow.svg";
import { ReactComponent as Down } from "../../../assets/icons/down-arrow.svg";
import "./Select.scss";

const Select = ({ options }) => {
  const [selected, setSelected] = useState(false);
  const [select, setSelect] = useState(options[0]);

  const handleChangeStyleSelect = () => {
    setSelected(!selected);
  };

  const handleSetStyle = (option) => {
    setSelect(option);
    setSelected(!selected);
  };

  return (
    <div
      className={selected ? "select-opened" : "select-closed"}
      onClick={handleChangeStyleSelect}
    >
      <label htmlFor="">
        {select ? select : "Select a style for your story:"}
      </label>
      <div>{selected ? <Up /> : <Down />}</div>
      {selected && (
        <ul
          className="list"
          style={{
            display: selected ? "block" : "none",
          }}
        >
          {options.map((option) => (
            <li onClick={() => handleSetStyle(option)}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
