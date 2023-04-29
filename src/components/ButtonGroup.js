import React, { useState } from "react";

const ButtonGroup = ({ onClick, buttons }) => {
  const [clickedId, setClickedId] = useState(-1);

  const handleClick = (id, label) => {
    setClickedId(id);
    onClick(label)
  };

  return (
    <>
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          type="input"
          onClick={(event) => handleClick(i, buttonLabel)}
          className={i === clickedId ? "customButton active" : "customButton"}
        >
          {buttonLabel}
        </button>
      ))}
    </>
  );
};

export default ButtonGroup;