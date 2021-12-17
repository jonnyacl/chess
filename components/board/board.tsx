import { ReactElement, useEffect, useState } from "react";
import Square from "../square/square";
import styles from "./board.module.scss";

const boardSize: number = 8;
const squareWidth: number = 60;
const gridLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

function Board(): ReactElement {
  const [theme, setTheme] = useState({ dark: "black", light: "white" });
  const [playerColour, setPlayerColour] = useState<string>("white");
  const [boardRows, setBoardRows] = useState<ReactElement[]>([]);

  const toggleColour = () => {
    if (playerColour === "white") {
      setPlayerColour("black");
    } else {
      setPlayerColour("white");
    }
  };
  useEffect(() => {
    const setUpRows = [];
    for (let i = 0; i < 8; i++) {
      const row: ReactElement[] = [];
      for (let j = 0; j < boardSize; j++) {
        const yCoord = playerColour === "white" ? 7 - i : i;
        const xCoord = playerColour === "white" ? j : 7 - j;
        row.push(
          <Square
            style={{
              outline: "1px solid black",
              width: squareWidth,
              height: squareWidth,
              marginTop: "1px",
              marginLeft: "1px",
            }}
            grid={{
              x: xCoord,
              xLetter: gridLetters[xCoord],
              y: yCoord,
            }}
            squareTheme={theme}
            key={`${xCoord}${yCoord}`}
            playerColour={playerColour}
          />
        );
      }
      setUpRows.push(
        <div className={styles.boardRow} key={`row${i}`}>
          {row.map((r) => r)}
        </div>
      );
    }
    setBoardRows(setUpRows);
  }, [theme, playerColour]);
  return (
    <div className={styles.board}>
      <div className={styles.toggle}>
        <span className={styles.toggleColour}>White</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={playerColour === "black"}
            onClick={toggleColour}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleColour}>Black</span>
      </div>
      {boardRows.map((square) => square)}
    </div>
  );
}

export default Board;
