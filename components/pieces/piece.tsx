import { ReactElement } from "react";
import { PieceProps } from ".";
import pieceStyles from "./piece.module.scss";

function Piece(props: PieceProps): ReactElement {
  if (props.colour.description) {
    return (
      <div className={pieceStyles.piece}>
        <div className={props.style[props.colour.description]}></div>
      </div>
    );
  }
  return <p />;
}

export default Piece;
