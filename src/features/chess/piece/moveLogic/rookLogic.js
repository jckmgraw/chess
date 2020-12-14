import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';

export const rookMove = ({ board, startPos, endPos, piece }) => {
  const [startX, startY] = getIndexesFromPos(startPos);
  const [endX, endY] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);

  // Case 1: left
  // Case 2: right
  // Case 3: up
  // Case 4: down
  // Case 5: cannot capture own piece
  if (startY !== endY && startX !== endX) {
    return { isLegal: false };
  }
  // Case 1
  if (startY === endY && startX > endX) {
    for (let x = startX - 1; x > endX; x--) {
      if (board[x][startY] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 2
  else if (startY === endY && startX < endX) {
    for (let x = startX + 1; x < endX; x++) {
      if (board[x][startY] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 3
  else if (startY < endY && startX === endX) {
    for (let y = startY + 1; y < endY; y++) {
      if (board[startX][y] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 4
  else if (startY > endY && startX === endX) {
    for (let y = startY - 1; y > endY; y--) {
      if (board[startX][y] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 5
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false };
  } else {
    console.log('legal rook move');
    return { isLegal: true };
  }
};
