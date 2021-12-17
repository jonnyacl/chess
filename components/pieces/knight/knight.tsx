import { ReactElement } from "react";
import { Move, PieceProps } from "..";
import Piece from "../piece";
import styles from "./knight.module.scss";

const knightMove: Move = {};

function Knight(props: PieceProps): ReactElement {
  return <Piece {...props} move={knightMove} name="knight" style={styles} />;
}

export default Knight;
