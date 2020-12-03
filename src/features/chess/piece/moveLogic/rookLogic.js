import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';

export const rookMove = (board, startPos, endPos, piece) => {
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  console.log(`startRow: ${startRow}, startCol: ${startCol}`);
  console.log(`endRow: ${endRow}, endCol: ${endCol}`);
  console.log(`endPosPiece: ${endPosPiece}`);

  // Case 1: left
  // Case 2: right
  // Case 3: up
  // Case 4: down
  // Case 5: cannot capture own piece
  if (startRow !== endRow && startCol !== endCol) {
    return false;
  }
  // Case 1
  if (startRow === endRow && startCol > endCol) {
    for (let i = startCol - 1; i > endCol; i--) {
      if (board[startRow][i] !== 0) {
        return false;
      }
    }
  }
  // Case 2
  else if (startRow === endRow && startCol < endCol) {
    for (let i = startCol + 1; i < endCol; i++) {
      if (board[startRow][i] !== 0) {
        return false;
      }
    }
  }
  // Case 3
  else if (startRow < endRow && startCol === endCol) {
    for (let i = startRow + 1; i < endRow; i++) {
      if (board[i][startCol] !== 0) {
        return false;
      }
    }
  }
  // Case 4
  else if (startRow > endRow && startCol === endCol) {
    for (let i = startRow - 1; i > endRow; i--) {
      if (board[i][startCol] !== 0) {
        return false;
      }
    }
  }
  // Case 5
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return false;
  } else {
    return true;
  }
};
