import { grid } from "../grid";
import Bishop from "../components/pieces/bishop/bishop";
import King from "../components/pieces/king/king";
import Knight from "../components/pieces/knight/knight";
import Pawn from "../components/pieces/pawn/pawn";
import Queen from "../components/pieces/queen/queen";
import Rook from "../components/pieces/rook/rook";
import { isLegalMove } from "../chess";

const initBoard: any[][] = [
  [
    <Rook colour={WHITE} />,
    <Knight colour={WHITE} />,
    <Bishop colour={WHITE} />,
    <Queen colour={WHITE} />,
    <King colour={WHITE} />,
    <Bishop colour={WHITE} />,
    <Knight colour={WHITE} />,
    <Rook colour={WHITE} />,
  ],
  [
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
    <Pawn colour={WHITE} />,
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
    <Pawn colour={BLACK} />,
  ],
  [
    <Rook colour={BLACK} />,
    <Knight colour={BLACK} />,
    <Bishop colour={BLACK} />,
    <Queen colour={BLACK} />,
    <King colour={BLACK} />,
    <Bishop colour={BLACK} />,
    <Knight colour={BLACK} />,
    <Rook colour={BLACK} />,
  ],
];
describe("chess moves", () => {
  it("A pawn can move one square forward", () => {
    const board: any[][] = [[]];
    const fromGrid: grid = { x: 1, y: 1 };
    const toGrid: grid = { x: 1, y: 2 };
    const isLegal: boolean = isLegalMove(board, fromGrid, toGrid);
  });
});

export {};
