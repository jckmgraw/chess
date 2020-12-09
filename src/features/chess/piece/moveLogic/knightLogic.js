import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';

export const knightMove = ({ board, startPos, endPos, piece }) => {
  const [startX, startY] = getIndexesFromPos(startPos);
  const [endX, endY] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startX - endX);
  const yDist = Math.abs(startY - endY);

  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false };
  } else if ((xDist === 2 && yDist === 1) || (xDist === 1 && yDist === 2)) {
    return { isLegal: true };
  } else {
    return { isLegal: false };
  }
};
