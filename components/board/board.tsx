import { ReactElement, useEffect, useState } from "react";
import { BLACK, WHITE } from "../../colours";
import Bishop from "../pieces/bishop/bishop";
import King from "../pieces/king/king";
import Knight from "../pieces/knight/knight";
import Pawn from "../pieces/pawn/pawn";
import Queen from "../pieces/queen/queen";
import Rook from "../pieces/rook/rook";
import Square from "../square/square";
import styles from "./board.module.scss";

const boardSize: number = 8;
const squareWidth: number = 60;
const gridLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const initPieces: any[][] = [
  [
    <Rook colour={WHITE} />,
    <Knight colour={WHITE} />,
    <Bishop colour={WHITE} />,
    <Queen colour={WHITE} />,
    <King colour={WHITE} />,
    <Bishop colour={WHITE} />,
    <Knight colour={WHITE} />,
    <Rook colour={WHITE} />,
  ],
  [
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
  ],
  [
    <Rook colour={BLACK} />,
    <Knight colour={BLACK} />,
    <Bishop colour={BLACK} />,
    <Queen colour={BLACK} />,
    <King colour={BLACK} />,
    <Bishop colour={BLACK} />,
    <Knight colour={BLACK} />,
    <Rook colour={BLACK} />,
  ],
];

function Board(): ReactElement {
  const [theme, setTheme] = useState({ dark: "grey", light: "white" });
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
            piece={initPieces[yCoord][xCoord] || null}
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
            onChange={toggleColour}
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
