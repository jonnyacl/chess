import { ReactElement } from "react";
import { PieceProps } from "..";
import Piece from "../piece";
import styles from "./rook.module.scss";

function Rook(props: PieceProps): ReactElement {
  return <Piece {...props} name="pawn" style={styles} />;
}

export default Rook;
