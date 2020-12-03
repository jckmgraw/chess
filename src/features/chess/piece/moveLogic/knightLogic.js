import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';

export const knightMove = (board, startPos, endPos, piece) => {
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startCol - endCol);
  const yDist = Math.abs(startRow - endRow);

  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return false;
  } else if ((xDist === 2 && yDist === 1) || (xDist === 1 && yDist === 2)) {
    return true;
  } else {
    return false;
  }
};
