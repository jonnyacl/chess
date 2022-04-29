import { grid } from '../../grid';
import Pawn from './pawn/pawn';
import Rook from './rook/rook';
import Bishop from './bishop/bishop';
import Knight from './knight/knight';
import King from './king/king';
import Queen from './queen/queen';
export interface PieceProps {
  colour: symbol;
  name?: string;
  style?: any;
  position?: grid;
  onMove?: (newPosition: grid) => void;
  onSelectPiece?: (startPosition: grid) => void;
}

export { King, Bishop, Rook, Knight, Pawn, Queen };
