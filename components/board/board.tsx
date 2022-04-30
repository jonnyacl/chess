import { ReactElement, useCallback, useEffect, useState } from 'react';
import { boardSize, ChessPiece, gridLetters } from '../../chess';
import { BLACK, WHITE } from '../../colours';
import { grid } from '../../grid';
import { AllPieces } from '../../pieces';
import Piece from '../pieces/piece';
import Square, { SquareTheme } from '../square/square';
import styles from './board.module.scss';

const squareWidth: number = 60;
const pieceLayout: Array<Array<ChessPiece | null>> = [
  [
    AllPieces['WHITEROOK'],
    AllPieces['WHITEKNIGHT'],
    AllPieces['WHITEBISHOP'],
    AllPieces['WHITEQUEEN'],
    AllPieces['WHITEKING'],
    AllPieces['WHITEBISHOP'],
    AllPieces['WHITEKNIGHT'],
    AllPieces['WHITEROOK'],
  ],
  [
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
    AllPieces['WHITEPAWN'],
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
    AllPieces['BLACKPAWN'],
  ],
  [
    AllPieces['BLACKROOK'],
    AllPieces['BLACKKNIGHT'],
    AllPieces['BLACKBISHOP'],
    AllPieces['BLACKQUEEN'],
    AllPieces['BLACKKING'],
    AllPieces['BLACKBISHOP'],
    AllPieces['BLACKKNIGHT'],
    AllPieces['BLACKROOK'],
  ],
];

function Board({
  playerColour = WHITE,
  theme = {
    dark: 'grey',
    light: 'white',
    highlight: 'black',
  },
}: {
  playerColour: symbol;
  theme: SquareTheme;
}): ReactElement {
  const [turn, setTurn] = useState<symbol>(WHITE);
  const [capturedBlackPieces, setCapturedBlackPieces] = useState<ChessPiece[]>(
    []
  );
  const [capturedWhitePieces, setCapturedWhitePieces] = useState<ChessPiece[]>(
    []
  );
  const [winner, setWinner] = useState<symbol | null>(null);
  const [boardRows, setBoardRows] = useState<ReactElement[]>([]);
  const [selectedPieceSquare, setSelectedPieceSquare] = useState<grid | null>(
    null
  );
  useEffect(() => {
    console.log(`white's move`);
  }, []);

  const toggleTurn = useCallback(() => {
    if (turn === WHITE) {
      console.log(`black's move`);
      setTurn(BLACK);
    } else if (turn === BLACK) {
      console.log(`white's move`);
      setTurn(WHITE);
    }
  }, [turn]);

  const onSquareClick = (grd: grid) => {
    if (
      selectedPieceSquare &&
      (selectedPieceSquare.x !== grd.x || selectedPieceSquare.y !== grd.y)
    ) {
      // 1. get piece to move
      const selectedPiece: ChessPiece | null =
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x];
      if (selectedPiece === null) {
        // no piece to move, should not happen
        console.error('No selected piece');
        return;
      }
      // 2. check ifpiece to move can move to new grd position
      if (selectedPiece.canMove(pieceLayout, grd, turn)) {
        // 3. update piece layout
        pieceLayout[selectedPieceSquare.y][selectedPieceSquare.x] = null;
        if (pieceLayout[grd.y][grd.x]) {
          console.log('Piece captured', pieceLayout[grd.y][grd.x]);
          const capturePiece = pieceLayout[grd.y][grd.x] as ChessPiece;
          if (capturePiece.colour === WHITE) {
            setCapturedWhitePieces([
              ...capturedWhitePieces,
              pieceLayout[grd.y][grd.x] as ChessPiece,
            ]);
          } else {
            setCapturedBlackPieces([
              ...capturedBlackPieces,
              pieceLayout[grd.y][grd.x] as ChessPiece,
            ]);
          }
        }
        pieceLayout[grd.y][grd.x] = selectedPiece;
        setSelectedPieceSquare(null);
        toggleTurn();
      }
    } else {
      const selectedPiece = pieceLayout[grd.y][grd.x];
      if (selectedPiece && selectedPiece.colour === turn) {
        // clicked on valid piece square, mark it as selected
        // console.log(
        //   "selected piece",
        //   selectedPiece.name,
        //   `${grd.xLetter}${grd.y + 1}`,
        //   selectedPiece.position
        // );
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
              marginTop: '1px',
              marginLeft: '1px',
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
            onClick={onSquareClick}
            onMove={onSquareClick}
            onSelectPiece={setSelectedPieceSquare}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, playerColour, selectedPieceSquare]);
  return (
    <>
      <div className={styles.board}>{boardRows.map((row) => row)}</div>
      <div>
        <div className={styles.capturedPieces}>
          {capturedWhitePieces.map((p, i) => {
            return <div key={`white-${i}`}>{p.renderPiece()}</div>;
          })}
        </div>
        <div className={styles.capturedPieces}>
          {capturedBlackPieces.map((p, i) => {
            return <div key={`black-${i}`}>{p.renderPiece()}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default Board;
