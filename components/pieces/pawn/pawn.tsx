import { ReactElement } from 'react';
import { PieceProps } from '..';
import Piece from '../piece';
import styles from './pawn.module.scss';

function Pawn(props: PieceProps): ReactElement {
  return <Piece {...props} name="pawn" style={styles} />;
}

export default Pawn;
