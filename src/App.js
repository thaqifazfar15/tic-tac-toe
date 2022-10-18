import { useState, useEffect, useMemo } from "react";
import GridContainer from "./components/GridContainer";

function App() {
  const [box, setBox] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [score, setScore] = useState([0, 0]);
  const [show, setShow] = useState("hidden");
  const [winner, setWinner] = useState("");
  const [showText, setShowText] = useState("hidden");
  // I use useMemo() to prevent infinite loop of useEffect,
  // because ESLint forced me to put winningConditions array as dependencies for useEffect
  const winningConditions = useMemo(
    () => [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    []
  );

  function resetScoreAndPlayer() {
    setPlayer("X");
    setScore([0, 0]);
    setShow("hidden");
    setShowText("hidden");
    setWinner("");
  }

  function handleResetButton() {
    setBox(box.map((value) => (value = "")));
    resetScoreAndPlayer();
  }
  // check is either score has reached 3 so the game ended
  useEffect(() => {
    score.map((value, idx) => {
      const winner = idx === 0 ? "X" : "O";
      if (value === 3) {
        setShow("block");
        setShowText("block");
        setWinner(winner);
      }

      return value;
    });
  }, [score]);

  // check winner for every move player make,
  // or reset the board when it is draw
  useEffect(() => {
    // if no moves can be made, it is draw
    if (box.includes("") === false) {
      setShow("block");
    }
    winningConditions.forEach((arr) => {
      const a = box[arr[0]];
      const b = box[arr[1]];
      const c = box[arr[2]];
      const copy = [...score];
      const player = a === "X" ? 0 : 1;

      if ((a || b || c) === "") return;
      if (a === b && b === c) {
        copy[player]++;
        setScore(copy);
        setBox(box.map((value) => (value = "")));
        setPlayer("X");
      }
    });
  }, [box, score, winningConditions]);

  return (
    <main className="mx-auto flex h-screen flex-col items-center justify-center gap-2 lg:max-w-screen-md">
      <h1 className="text-4xl">Tic Tac Toe</h1>
      <h2 className="text-xl">First to 3 wins!</h2>
      <div className="flex gap-8 text-xl">
        <span>X : {score[0]}</span>
        <span>O : {score[1]}</span>
      </div>
      <GridContainer
        box={box}
        setBox={setBox}
        player={player}
        setPlayer={setPlayer}
        show={show}
        setShow={setShow}
        winner={winner}
        showText={showText}
        setShowText={setShowText}
      />
      <button
        onClick={handleResetButton}
        className="mt-5 rounded-xl bg-red-400 px-9 py-4 text-xl text-white shadow-lg hover:bg-red-300 hover:shadow-xl"
      >
        Reset
      </button>
    </main>
  );
}

export default App;
