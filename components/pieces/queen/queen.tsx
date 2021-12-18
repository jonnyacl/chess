import { ReactElement } from "react";
import { PieceProps } from "..";
import Piece from "../piece";
import styles from "./queen.module.scss";

function Queen(props: PieceProps): ReactElement {
  return <Piece {...props} name="pawn" style={styles} />;
}

export default Queen;
