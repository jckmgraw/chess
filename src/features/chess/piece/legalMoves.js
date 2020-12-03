import { getIndexesFromPos, getPieceFromBoardPos } from './pieceUtil';
import ENV from '../../../env';

export const pawnMove = (board, startPos, endPos, piece) => {
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  console.log(`startRow: ${startRow}, startCol: ${startCol}`);
  console.log(`endRow: ${endRow}, endCol: ${endCol}`);
  console.log(`endPosPiece: ${endPosPiece}`);

  // Case 1: Move forward one
  // Case 2: First move 2 moves forward
  // Case 3: Standard diagonal capture
  // Case 4: En Passant (TODO)
  // Case 5: Pawn upgrade
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
    if (endPosPiece === 0) {
      if (startRow === 1 && Math.abs(endRow - startRow) <= 2) {
        return true;
      }
      if (Math.abs(endRow - startRow) === 1) {
        return true;
      }
    }
    return false;
  } else if (piece === ENV.BLACK_PAWN) {
    console.log('black piece');
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
    if (endPosPiece === 0) {
      if (startRow === 7 && Math.abs(endRow - startRow) <= 2) {
        return true;
      }
      if (Math.abs(endRow - startRow) === 1) {
        return true;
      }
    }
    return false;
  } else {
    console.error('unknown piece type');
    return false;
  }
};
