import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';

export const bishopMove = (board, startPos, endPos, piece) => {
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  console.log(`startRow: ${startRow}, startCol: ${startCol}`);
  console.log(`endRow: ${endRow}, endCol: ${endCol}`);
  console.log(`endPosPiece: ${endPosPiece}`);

  // Case 1: up/left diagonal
  // Case 2: up/right diagonal
  // Case 3: down/left diagonal
  // Case 4: down/right diagonal
  // Case 5: cannot capture own piece
  if (startRow === endRow || startCol === endCol) {
    return false;
  }
  // Case 1
  if (startRow < endRow && startCol > endCol) {
    let j = startRow + 1;
    for (let i = startCol - 1; i > endCol; i--) {
      if (board[j][i] !== 0) {
        return false;
      }
      j++;
    }
  }
  // Case 2
  else if (startRow < endRow && startCol < endCol) {
    let j = startRow + 1;
    for (let i = startCol + 1; i < endCol; i++) {
      if (board[j][i] !== 0) {
        return false;
      }
      j++;
    }
  }
  // Case 3
  else if (startRow > endRow && startCol > endCol) {
    let j = startCol - 1;
    for (let i = startRow - 1; i > endRow; i--) {
      if (board[i][j] !== 0) {
        return false;
      }
      j++;
    }
  }
  // Case 4
  else if (startRow > endRow && startCol < endCol) {
    let j = startCol + 1;
    for (let i = startRow - 1; i > endRow; i--) {
      if (board[i][j] !== 0) {
        return false;
      }
      j++;
    }
  }
  // Case 5
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return false;
  } else {
    return true;
  }
};
