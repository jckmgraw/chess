import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';
import ENV from '../../../../env';

export const pawnMove = (board, startPos, endPos, piece) => {
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);

  // TODO: improve code readability
  // Case 1: Move forward one
  // Case 2: First move 2 moves forward
  // Case 3: Standard diagonal capture
  // Case 4: En Passant (TODO)
  // Case 5: Pawn upgrade (TODO)
  if (piece === ENV.WHITE_PAWN) {
    if (startRow > endRow) {
      return false;
    }
    // Case 3
    if (startCol !== endCol) {
      if (
        endPosPiece < 0 &&
        Math.abs(startCol - endCol) === 1 &&
        endRow - startRow === 1
      ) {
        return true;
      }
      return false;
    }
    // Cases 1 & 2
    if (
      endPosPiece === 0 &&
      ((startRow === 1 && Math.abs(endRow - startRow) <= 2) ||
        Math.abs(endRow - startRow) === 1) &&
      board[startRow + 1][startCol] === 0
    ) {
      return true;
    }
    return false;
  } else if (piece === ENV.BLACK_PAWN) {
    if (startRow < endRow) {
      return false;
    }
    // Case 3
    if (startCol !== endCol) {
      if (
        endPosPiece > 0 &&
        Math.abs(startCol - endCol) === 1 &&
        Math.abs(endRow - startRow) === 1
      ) {
        return true;
      }
      return false;
    }
    // Cases 1 & 2
    if (
      endPosPiece === 0 &&
      ((startRow === 6 && Math.abs(endRow - startRow) <= 2) ||
        Math.abs(endRow - startRow) === 1) &&
      board[startRow - 1][startCol] === 0
    ) {
      return true;
    }
    return false;
  } else {
    console.error('unknown piece type');
    return false;
  }
};
