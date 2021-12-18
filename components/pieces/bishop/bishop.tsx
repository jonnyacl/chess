import { ReactElement } from "react";
import { PieceProps } from "..";
import Piece from "../piece";
import styles from "./bishop.module.scss";

function Bishop(props: PieceProps): ReactElement {
  return <Piece {...props} name="pawn" style={styles} />;
}

export default Bishop;
