import { ReactElement } from "react";
import { Move, PieceProps } from "..";
import Piece from "../piece";
import styles from "./rook.module.scss";

const rookMove: Move = {};

function Rook(props: PieceProps): ReactElement {
  return <Piece {...props} move={rookMove} name="pawn" style={styles} />;
}

export default Rook;
