import { ReactElement } from "react";
import { PieceProps } from "..";
import Piece from "../piece";
import styles from "./knight.module.scss";

function Knight(props: PieceProps): ReactElement {
  return <Piece {...props} name="knight" style={styles} />;
}

export default Knight;
