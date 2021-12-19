import { grid } from "./grid";

const emptyBoardGrid: grid[] = [];
const gridLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const boardSize: number = 8;

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    emptyBoardGrid.push({ x: i, y: j });
  }
}

export { emptyBoardGrid, gridLetters, boardSize };

function getPiece(
  name: string,
  colour: symbol,
  position: grid,
  board: any[][]
): ChessPiece {
  switch (name.toLowerCase()) {
    case "pawn":
      return new Pawn(name, colour, position, board);
    case "knight":
      return new Knight(name, colour, position, board);
    case "bishop":
      return new Bishop(name, colour, position, board);
    case "rook":
      return new Rook(name, colour, position, board);
    case "king":
      return new King(name, colour, position, board);
    case "queen":
      return new Queen(name, colour, position, board);
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
    movingPiece.props.colour,
    fromGrid,
    board
  );
  console.log(
    "move attempted",
    piece,
    `${fromGrid.xLetter}${fromGrid.y + 1}`,
    "to",
    `${toGrid.xLetter}${toGrid.y + 1}`,
    toGrid
  );
  const availableMoves = piece.moves();
  console.log("available moves", availableMoves);
  const legalMove: boolean =
    availableMoves.filter((f) => {
      return f.x === toGrid.x && f.y === toGrid.y;
    }).length === 1;
  console.log("legal move", legalMove);
  return legalMove;
}

export class ChessPiece {
  name: string;
  colour: symbol;
  position: grid;
  board: any[][];
  moves(): grid[] {
    console.log("this piece colour", this.colour);
    return [...emptyBoardGrid].filter((g) => {
      for (let i in this.board) {
        for (let j in this.board[i]) {
          // remove all same colour pieces as available squares
          if (this.board[i][j] === null) {
            console.log("no square on", i, j);
          }
          return (
            (this.board[i][j] &&
              this.board[i][j].props &&
              this.board[i][j].props.colour !== this.colour) ||
            this.board[i][j] === null
          );
        }
      }
    });
  }
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    this.name = name;
    this.colour = colour;
    this.position = position;
    this.board = board;
  }
}

export class Pawn extends ChessPiece {
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    super(name, colour, position, board);
  }

  moves(): grid[] {
    return [
      ...super.moves(),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Knight extends ChessPiece {
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    super(name, colour, position, board);
  }

  moves(): grid[] {
    return [
      ...super.moves(),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Bishop extends ChessPiece {
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    super(name, colour, position, board);
  }

  moves(): grid[] {
    return [
      ...super.moves(),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Rook extends ChessPiece {
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    super(name, colour, position, board);
  }

  moves(): grid[] {
    return [
      ...super.moves(),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Queen extends ChessPiece {
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    super(name, colour, position, board);
  }

  moves(): grid[] {
    return [
      ...super.moves(),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class King extends ChessPiece {
  constructor(name: string, colour: symbol, position: grid, board: any[][]) {
    super(name, colour, position, board);
  }

  moves(): grid[] {
    return [
      ...super.moves(),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}
