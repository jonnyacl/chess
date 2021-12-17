import { ReactElement } from "react";
import { Move, PieceProps } from "..";
import Piece from "../piece";
import styles from "./pawn.module.scss";

const pawnMove: Move = {};

function Pawn(props: PieceProps): ReactElement {
  return <Piece {...props} move={pawnMove} name="pawn" style={styles} />;
}

export default Pawn;
