import { grid } from './grid';
import {
  Pawn as PawnPiece,
  King as KingPiece,
  Rook as RookPiece,
  Bishop as BishopPiece,
  Knight as Knightpiece,
  Queen as QueenPiece,
} from './components/pieces/';
import React from 'react';

const allSquares: grid[] = [];
const gridLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const boardSize: number = 8;

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    allSquares.push({ x: i, y: j });
  }
}

export { allSquares, gridLetters, boardSize };

export abstract class ChessPiece {
  name: string;
  colour: symbol;
  position: grid;
  checkInit(turn: symbol) {
    if (turn.description !== this.colour.description) {
      console.error(`Not ${this.colour.description}'s move!`);
      return false;
    }
    if (this.position.x === -1 || this.position.y === -1) {
      throw new Error('Piece position not initialized!');
    }
    return true;
  }
  legalMoves(board: Array<Array<ChessPiece | null>>): grid[] {
    // console.log("this piece colour", this.colour);
    // console.log("current board", board);
    const allowedSquares = [...allSquares].filter((g) => {
      return (
        board[g.y][g.x] === null || board[g.y][g.x]?.colour !== this.colour
      );
    });
    // console.log('allowed', allowedSquares);
    return allowedSquares;
  }
  isCheck() {
    return false;
  }
  /**
   * Updates piece position
   * @param toSquare square to move to, check if it is legal then reposition
   */
  canMove(
    board: Array<Array<ChessPiece | null>>,
    toSquare: grid,
    turn: symbol
  ): boolean {
    if (!this.checkInit(turn)) {
      return false;
    }
    console.log('checking', { x: toSquare.x, y: toSquare.y });
    if (this.isCheck()) {
      console.log('CHECK!');
      return false;
    }
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
    // console.log('set', this.name, 'position', position);
    this.position = position;
    return this;
  }

  abstract renderPiece(): React.ReactNode;
}

export class Pawn extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super('pawn', colour, position);
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

  renderPiece(): React.ReactNode {
    return <PawnPiece colour={this.colour} />;
  }
}

export class Knight extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super('knight', colour, position);
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

  renderPiece(): React.ReactNode {
    return <Knightpiece colour={this.colour} />;
  }
}

export class Bishop extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super('bishop', colour, position);
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

  renderPiece(): React.ReactNode {
    return <BishopPiece colour={this.colour} />;
  }
}

export class Rook extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super('rook', colour, position);
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

  renderPiece(): React.ReactNode {
    return <RookPiece colour={this.colour} />;
  }
}

export class Queen extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super('queen', colour, position);
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

  renderPiece(): React.ReactNode {
    return <QueenPiece colour={this.colour} />;
  }
}

export class King extends ChessPiece {
  constructor(colour: symbol, position?: grid) {
    super('king', colour, position);
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

  renderPiece(): React.ReactNode {
    return <KingPiece colour={this.colour} />;
  }
}
