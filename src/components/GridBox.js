import React from "react";

function GridBox({ currPlayer, value, onclick }) {
  const output = value !== "" ? "" : currPlayer;
  const style = value === "X" ? "text-red-300" : "text-blue-300";
  return (
    <div
      className={`relative flex cursor-pointer items-center justify-center border-2 border-gray-300 text-8xl md:text-9xl ${style}`}
      onClick={onclick}
    >
      {value}
      <div className="absolute grid h-full  w-full place-content-center text-center align-middle text-gray-300 opacity-0 hover:opacity-50">
        <span>{output}</span>
      </div>
    </div>
  );
}

export default GridBox;
