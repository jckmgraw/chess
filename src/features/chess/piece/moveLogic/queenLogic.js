import { rookMove } from './rookLogic';
import { bishopMove } from './bishopLogic';

const canRookMove = ({ board, startPos, endPos, piece }) => {
  const { isLegal } = rookMove({ board, startPos, endPos, piece });
  if (isLegal) return true;
};

const canBishopMove = ({ board, startPos, endPos, piece }) => {
  const { isLegal } = bishopMove({ board, startPos, endPos, piece });
  if (isLegal) return true;
};

export const queenMove = ({ board, startPos, endPos, piece }) => {
  if (
    canRookMove({ board, startPos, endPos, piece }) ||
    canBishopMove({ board, startPos, endPos, piece })
  ) {
    return { isLegal: true };
  }
  return { isLegal: false };
};
