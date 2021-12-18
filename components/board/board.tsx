import { ReactElement, useCallback, useEffect, useState } from "react";
import { isLegalMove } from "../../chess";
import { BLACK, WHITE } from "../../colours";
import { grid } from "../../grid";
import Bishop from "../pieces/bishop/bishop";
import King from "../pieces/king/king";
import Knight from "../pieces/knight/knight";
import Pawn from "../pieces/pawn/pawn";
import Queen from "../pieces/queen/queen";
import Rook from "../pieces/rook/rook";
import Square, { SquareTheme } from "../square/square";
import styles from "./board.module.scss";

const boardSize: number = 8;
const squareWidth: number = 60;
const gridLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const pieceLayout: any[][] = [
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
  const [theme, setTheme] = useState<SquareTheme>({
    dark: "grey",
    light: "white",
    highlight: "black",
  });
  const [playerColour, setPlayerColour] = useState<symbol>(WHITE);
  const [turn, setTurn] = useState<symbol>(WHITE);
  const [winner, setWinner] = useState<symbol | null>(null);
  const [boardRows, setBoardRows] = useState<ReactElement[]>([]);
  const [selectedPieceSquare, setSelectedPieceSquare] = useState<grid | null>(
    null
  );

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
    if (
      selectedPieceSquare &&
      (selectedPieceSquare.x !== grd.x || selectedPieceSquare.y !== grd.y)
    ) {
      // 1. get piece from prev selected square
      const selectpiecedPiece =
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x];
      // 2. check if prev selected piece can move to new grd position: i.e. chess rules here!!
      // 3. update piece layout
      if (isLegalMove(pieceLayout, selectedPieceSquare, grd)) {
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x] = null;
        pieceLayout[grd.y][grd.x] = selectpiecedPiece;
        setSelectedPieceSquare(null);
        // 4. toggle colour turn
        toggleTurn();
      }
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
            selected={
              xCoord === selectedPieceSquare?.x &&
              yCoord === selectedPieceSquare.y
            }
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
  }, [theme, playerColour, selectedPieceSquare]);
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
