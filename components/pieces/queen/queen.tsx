import { ReactElement } from "react";
import { Move, PieceProps } from "..";
import Piece from "../piece";
import styles from "./queen.module.scss";

const queenMove: Move = {};

function Queen(props: PieceProps): ReactElement {
  return <Piece {...props} move={queenMove} name="pawn" style={styles} />;
}

export default Queen;
