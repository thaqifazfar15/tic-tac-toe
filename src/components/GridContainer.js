import React from "react";
import GridBox from "./GridBox";

function GridContainer({
  box,
  setBox,
  player,
  setPlayer,
  show,
  setShow,
  winner,
  showText,
  setShowText,
}) {
  const winnerMsg = winner === "" ? "" : `Congrats, ${winner} has won!`;

  function putValue(value) {
    if (value !== "") return value;
    player === "X" ? setPlayer("O") : setPlayer("X");
    return player;
  }

  function handlePlayerAction(boxIndex) {
    const updatedBoard = box.map((value, idx) => {
      if (idx === boxIndex) {
        return putValue(value);
      } else {
        return value;
      }
    });

    setBox(updatedBoard);
  }

  return (
    <div className="relative mt-4 grid aspect-square w-3/4 grid-cols-3 grid-rows-3 border-2 border-gray-300">
      <div
        className={`absolute ${show} z-10 flex h-full w-full flex-col items-center justify-center bg-white px-4 text-center text-4xl font-bold text-rose-500 opacity-50`}
        onClick={() => {
          if (winner === "") {
            setShow("hidden");
            setBox(box.fill(""));
          }
        }}
      >
        {winnerMsg}{" "}
        <span className={`text-rose-450 ${showText} text-2xl font-normal`}>
          Press Reset to continue
        </span>
      </div>
      {box.map((value, index) => (
        <GridBox
          currPlayer={player}
          value={value}
          key={index}
          onclick={() => handlePlayerAction(index)}
        />
      ))}
    </div>
  );
}

export default GridContainer;
