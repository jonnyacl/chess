import { grid } from "./grid";

const allSquares: grid[] = [];
const gridLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const boardSize: number = 8;

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    allSquares.push({ x: i, y: j });
  }
}

export { allSquares, gridLetters, boardSize };

export class ChessPiece {
  name: string;
  colour: symbol;
  position: grid;
  checkInit() {
    if (this.position.x === -1 || this.position.y === -1) {
      throw new Error("Piece position not initialized!");
    }
  }
  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    this.checkInit();
    console.log("this piece colour", this.colour);
    console.log("current board", board);
    const allowedSquares = [...allSquares].filter((g) => {
      return (
        board[g.y][g.x] === null || board[g.y][g.x]?.colour !== this.colour
      );
    });
    console.log("allowed", allowedSquares);
    return allowedSquares;
  }
  /**
   * Updates piece position
   * @param toSquare square to move to, check if it is legal then reposition
   */
  canMove(board: Array<Array<ChessPiece | null>>, toSquare: grid): boolean {
    this.checkInit();
    console.log("checking", { x: toSquare.x, y: toSquare.y });
    return (
      this.legalMoves(board).filter(
        (l) => l.x === toSquare.x && l.y === toSquare.y
      ).length === 1
    );
  }
  constructor(name: string, colour: symbol, position?: grid) {
    this.name = name;
    this.colour = colour;
    if (position) {
      this.position = position;
    } else {
      this.position = { x: -1, y: -1 };
    }
  }

  setPosition(position: grid): ChessPiece {
    console.log("set", this.name, "position", position);
    this.position = position;
    return this;
  }
}

export class Pawn extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super("pawn", colour, position);
  }

  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    return [
      ...super.legalMoves(board),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Knight extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super("knight", colour, position);
  }

  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    return [
      ...super.legalMoves(board),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Bishop extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super("bishop", colour, position);
  }

  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    return [
      ...super.legalMoves(board),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Rook extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super("rook", colour, position);
  }

  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    return [
      ...super.legalMoves(board),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class Queen extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super("queen", colour, position);
  }

  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    return [
      ...super.legalMoves(board),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}

export class King extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super("king", colour, position);
  }

  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    return [
      ...super.legalMoves(board),
      {
        x: this.position.x + 1,
        y: this.position.y,
      },
    ];
  }
}
