import { ReactElement } from 'react';
import { PieceProps } from '.';
import pieceStyles from './piece.module.scss';

function Piece(props: PieceProps): ReactElement<PieceProps> {
  if (props.colour.description) {
    return (
      <div
        className={pieceStyles.piece}
        id={`${props.colour.description}-${props.name}-${props.position?.xLetter}`}
        onMouseDown={() =>
          props.onSelectPiece &&
          props.position &&
          props.onSelectPiece(props.position)
        }
        draggable
      >
        <div className={props.style[props.colour.description]}></div>
      </div>
    );
  }
  return <p />;
}

export default Piece;
