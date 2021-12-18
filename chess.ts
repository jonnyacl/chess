import { grid } from "./grid";

function getPiece(name: string, colour: symbol): ChessPiece {
  switch (name.toLowerCase()) {
    case "pawn":
      return new Pawn();
    case "knight":
      return new Knight();
    case "bishop":
      return new Bishop();
    case "rook":
      return new Rook();
    case "king":
      return new King();
    case "queen":
      return new Queen();
    default:
      throw new Error("Invalid chess piece");
  }
}

/**
 *
 * @param board current piece layout on board
 * @param fromGrid piece moving from this square
 * @param toGrid piece moving to this square
 * @returns whether move is legal
 */
export function isLegalMove(
  board: any[][],
  fromGrid: grid,
  toGrid: grid
): boolean {
  const movingPiece = board[fromGrid.y][fromGrid.x];
  const piece: ChessPiece = getPiece(
    movingPiece.type.name,
    movingPiece.props.colour
  );
  console.log(
    "move attempted",
    piece,
    `${fromGrid.xLetter}${fromGrid.y + 1}`,
    "to",
    `${toGrid.xLetter}${toGrid.y + 1}`
  );
  return true;
}

export class ChessPiece {}

export class Pawn extends ChessPiece {}

export class Knight extends ChessPiece {}

export class Bishop extends ChessPiece {}

export class Rook extends ChessPiece {}

export class Queen extends ChessPiece {}

export class King extends ChessPiece {}
