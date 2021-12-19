import { ReactElement, useCallback, useEffect, useState } from "react";
import { boardSize, ChessPiece, gridLetters } from "../../chess";
import { BLACK, WHITE } from "../../colours";
import { grid } from "../../grid";
import { AllPieces } from "../../pieces";
import Square, { SquareTheme } from "../square/square";
import styles from "./board.module.scss";

const squareWidth: number = 60;
const pieceLayout: Array<Array<ChessPiece | null>> = [
  [
    AllPieces["WHITEROOK"],
    AllPieces["WHITEKNIGHT"],
    AllPieces["WHITEBISHOP"],
    AllPieces["WHITEQUEEN"],
    AllPieces["WHITEKING"],
    AllPieces["WHITEBISHOP"],
    AllPieces["WHITEKNIGHT"],
    AllPieces["WHITEROOK"],
  ],
  [
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
    AllPieces["WHITEPAWN"],
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
    AllPieces["BLACKPAWN"],
  ],
  [
    AllPieces["BLACKROOK"],
    AllPieces["BLACKKNIGHT"],
    AllPieces["BLACKBISHOP"],
    AllPieces["BLACKQUEEN"],
    AllPieces["BLACKKING"],
    AllPieces["BLACKBISHOP"],
    AllPieces["BLACKKNIGHT"],
    AllPieces["BLACKROOK"],
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
      const selectedPiece: ChessPiece | null =
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x];
      if (selectedPiece === null) {
        // no piece to move, should not happen
        console.warn("No piece was selected on previous click");
        return;
      }
      // 2. check if prev selected piece can move to new grd position
      if (selectedPiece.canMove(pieceLayout, grd)) {
        // 3. update piece layout
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x] = null;
        pieceLayout[grd.y][grd.x] = selectedPiece;
        setSelectedPieceSquare(null);
        // 4. toggle colour turn
        toggleTurn();
      }
    } else {
      const selectedPiece = pieceLayout[grd.y][grd.x];
      if (selectedPiece && selectedPiece.colour === turn) {
        // clicked on valid piece square, mark it as selected
        console.log(
          "selected piece",
          selectedPiece.name,
          `${grd.xLetter}${grd.y + 1}`,
          selectedPiece.position
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
            piece={pieceLayout[yCoord][xCoord] || undefined}
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
          {row.map((square) => square)}
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
      {boardRows.map((row) => row)}
    </div>
  );
}

export default Board;
