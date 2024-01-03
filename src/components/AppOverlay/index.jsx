import React from "react";
import "./AppOverlay.scss";

const AppOverlay = ({ close, children }) => {
  const handleChildClick = (e) => {
    // Предотвращаем всплытие события до родительского элемента (overlay)
    e.stopPropagation();
  };
  return (
    <div className="fixed">
      <div className="overlay-component" onClick={close}>
        <div className="child" onClick={(e) => handleChildClick(e)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppOverlay;
