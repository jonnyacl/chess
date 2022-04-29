import { ReactElement } from 'react';
import { PieceProps } from '..';
import Piece from '../piece';
import styles from './king.module.scss';

function King(props: PieceProps): ReactElement {
  return <Piece {...props} name="pawn" style={styles} />;
}

export default King;
