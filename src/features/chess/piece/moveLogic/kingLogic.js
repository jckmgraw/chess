import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';

export const kingMove = (board, startPos, endPos, piece) => {
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startCol - endCol);
  const yDist = Math.abs(startRow - endRow);

  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return false;
  } else if (
    (xDist === 1 && yDist === 1) ||
    (xDist === 1 && yDist === 0) ||
    (xDist === 0 && yDist === 1)
  ) {
    return true;
  } else {
    return false;
  }
};
