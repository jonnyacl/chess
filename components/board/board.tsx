import { ReactElement, useCallback, useEffect, useState } from "react";
import { BLACK, WHITE } from "../../colours";
import { grid } from "../../grid";
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
  const [playerColour, setPlayerColour] = useState<symbol>(WHITE);
  const [turn, setTurn] = useState<symbol>(WHITE);
  const [boardRows, setBoardRows] = useState<ReactElement[]>([]);
  const [selectedPieceSquare, setSelectedPieceSquare] = useState<grid | null>(
    null
  );
  const [pieceLayout, setPieceLayout] = useState(initPieces);

  const toggleTurn = useCallback(() => {
    if (turn === WHITE) {
      setTurn(BLACK);
    } else if (turn === BLACK) {
      setTurn(WHITE);
    }
  }, [turn]);

  const toggleColour = useCallback(() => {
    if (playerColour === WHITE) {
      setPlayerColour(BLACK);
    } else {
      setPlayerColour(WHITE);
    }
  }, [playerColour]);

  const pieceClick = (grd: grid) => {
    if (selectedPieceSquare) {
      // 1. get piece from prev selected square
      const selectpiecedPiece =
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x];
      console.log(
        "move attempted",
        selectpiecedPiece.type.name,
        `${selectedPieceSquare.xLetter}${selectedPieceSquare.y + 1}`,
        "to",
        `${grd.xLetter}${grd.y + 1}`
      );
      // 2. check if prev selected piece can move to new grd position
      // 3. update piece layout
      const newPieceLayout = [...pieceLayout];
      newPieceLayout[selectedPieceSquare.y][selectedPieceSquare.x] = null;
      newPieceLayout[grd.y][grd.x] = selectpiecedPiece;
      setSelectedPieceSquare(null);
      // 4. toggle colour turn
      toggleTurn();
    } else {
      const selectedPiece = pieceLayout[grd.y][grd.x];
      if (selectedPiece && selectedPiece.props.colour === turn) {
        // clicked on valid piece square, mark it as selected
        console.log(
          "selected piece",
          selectedPiece.type.name,
          `${grd.xLetter}${grd.y + 1}`
        );
        setSelectedPieceSquare(grd);
      }
    }
  };

  useEffect(() => {
    const setUpRows = [];
    for (let i = 0; i < 8; i++) {
      const row: ReactElement[] = [];
      for (let j = 0; j < boardSize; j++) {
        const yCoord = playerColour === WHITE ? 7 - i : i;
        const xCoord = playerColour === WHITE ? j : 7 - j;
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
            piece={pieceLayout[yCoord][xCoord] || null}
            onClick={pieceClick}
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
  }, [theme, playerColour, pieceLayout, selectedPieceSquare]);
  return (
    <div className={styles.board}>
      <div className={styles.toggle}>
        <span className={styles.toggleColour}>White</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={playerColour === BLACK}
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
