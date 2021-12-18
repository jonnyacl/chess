import { grid } from "../../grid";

export interface PieceProps {
  colour: symbol;
  name?: string;
  style?: any;
  move?: Move; // rules for piece movement and update grid
}

export interface Move {
  // doMove: Function; // execute move, logic for where piece can go from currentGrid
  // currentGrid: grid; // current board location
}
