import { Bishop, ChessPiece, King, Knight, Pawn, Queen, Rook } from "./chess";
import { BLACK, WHITE } from "./colours";

export interface PieceMap {
  [key: string]: ChessPiece;
}
export const AllPieces: PieceMap = {
  BLACKPAWN: new Pawn(BLACK),
  BLACKKNIGHT: new Knight(BLACK),
  BLACKBISHOP: new Bishop(BLACK),
  BLACKROOK: new Rook(BLACK),
  BLACKQUEEN: new Queen(BLACK),
  BLACKKING: new King(BLACK),
  WHITEPAWN: new Pawn(WHITE),
  WHITEKNIGHT: new Knight(WHITE),
  WHITEBISHOP: new Bishop(WHITE),
  WHITEROOK: new Rook(WHITE),
  WHITEQUEEN: new Queen(WHITE),
  WHITEKING: new King(WHITE),
};
