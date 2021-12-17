import { ReactElement } from "react";
import { Move, PieceProps } from "..";
import Piece from "../piece";
import styles from "./king.module.scss";

const kingMove: Move = {};

function King(props: PieceProps): ReactElement {
  return <Piece {...props} move={kingMove} name="pawn" style={styles} />;
}

export default King;
