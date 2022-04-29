import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import styles from './square.module.scss';
import { grid } from '../../grid';
import { WHITE } from '../../colours';
import { ChessPiece } from '../../chess';
import Pawn from '../pieces/pawn/pawn';
import Knight from '../pieces/knight/knight';
import Bishop from '../pieces/bishop/bishop';
import Rook from '../pieces/rook/rook';
import Queen from '../pieces/queen/queen';
import King from '../pieces/king/king';

function Square(props: SquareProps): ReactElement {
  const colors = useMemo(() => {
    const { x, y } = props.grid;
    let dark = 'grey';
    let light = 'white';
    let highlight = 'black';
    if (props.squareTheme) {
      dark = props.squareTheme.dark;
      light = props.squareTheme.light;
      highlight = props.squareTheme.highlight;
    }
    return x % 2 === 0
      ? y % 2 === 0
        ? { background: dark, color: light, highlight }
        : { background: light, color: dark, highlight }
      : y % 2 === 0
      ? { background: light, color: dark, highlight }
      : { background: dark, color: light, highlight };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.squareTheme]);
  const showX: boolean = useMemo(() => {
    if (props.playerColour === WHITE) {
      return props.grid.y === 0;
    }
    return props.grid.y === 7;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.playerColour]);
  const showY: boolean = useMemo(() => {
    if (props.playerColour === WHITE) {
      return props.grid.x === 0;
    }
    return props.grid.x === 7;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.playerColour]);

  const renderPiece = () => {
    switch (props.piece?.name.toLowerCase()) {
      case 'pawn':
        return (
          <Pawn
            colour={props.piece.colour}
            position={props.grid}
            onMove={props.onMove}
            onSelectPiece={props.onSelectPiece}
          />
        );
      case 'knight':
        return (
          <Knight
            colour={props.piece.colour}
            position={props.grid}
            onMove={props.onMove}
            onSelectPiece={props.onSelectPiece}
          />
        );
      case 'bishop':
        return (
          <Bishop
            colour={props.piece.colour}
            position={props.grid}
            onMove={props.onMove}
            onSelectPiece={props.onSelectPiece}
          />
        );
      case 'rook':
        return (
          <Rook
            colour={props.piece.colour}
            position={props.grid}
            onMove={props.onMove}
            onSelectPiece={props.onSelectPiece}
          />
        );
      case 'queen':
        return (
          <Queen
            colour={props.piece.colour}
            position={props.grid}
            onMove={props.onMove}
            onSelectPiece={props.onSelectPiece}
          />
        );
      case 'king':
        return (
          <King
            colour={props.piece.colour}
            position={props.grid}
            onMove={props.onMove}
            onSelectPiece={props.onSelectPiece}
          />
        );
    }
  };

  useEffect(() => {
    if (props.piece) {
      // on position update, rerender causes this useEffect to trigger, allowing us to update the piece object's board position
      props.piece.setPosition(props.grid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.piece]);

  return (
    <div
      className={styles.square}
      id={`${props.grid.xLetter}${props.grid.y + 1}`}
      style={{
        ...props.style,
        backgroundColor: colors.background,
        color: colors.color,
        border: props.selected ? `5px solid ${colors.highlight}` : 'none',
      }}
      onClick={() => {
        // console.log('square clicked', props.grid);
        props.onClick(props.grid);
      }}
      onDrop={() => {
        console.log('square dropped', props.grid.xLetter, props.grid.y + 1);
        props.onMove(props.grid);
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      {showY && <span className={styles.y}>{props.grid.y + 1}</span>}
      {showX && (
        <span className={styles.x}>{props.grid.xLetter?.toLowerCase()}</span>
      )}
      {renderPiece()}
    </div>
  );
}

interface SquareProps {
  grid: grid;
  style: any;
  squareTheme?: SquareTheme;
  playerColour: symbol;
  piece?: ChessPiece;
  onClick: Function;
  onMove: (square: grid) => void;
  onSelectPiece: (square: grid) => void;
  selected?: boolean;
}

export interface SquareTheme {
  dark: string;
  light: string;
  highlight: string;
}

export default Square;
