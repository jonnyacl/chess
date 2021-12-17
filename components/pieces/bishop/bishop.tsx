import { ReactElement } from "react";
import { Move, PieceProps } from "..";
import Piece from "../piece";
import styles from "./bishop.module.scss";

const bishopMove: Move = {};

function Bishop(props: PieceProps): ReactElement {
  return <Piece {...props} move={bishopMove} name="pawn" style={styles} />;
}

export default Bishop;
