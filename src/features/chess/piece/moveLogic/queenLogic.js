import { rookMove } from './rookLogic';
import { bishopMove } from './bishopLogic';

export const queenMove = (board, startPos, endPos, piece) => {
  if (
    rookMove(board, startPos, endPos, piece) ||
    bishopMove(board, startPos, endPos, piece)
  ) {
    return true;
  }
  return false;
};
