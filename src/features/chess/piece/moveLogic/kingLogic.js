import {
  isSquareThreatened,
  isSquaresThreatened,
  getIndexesFromPos,
  getPieceFromBoardPos,
} from '../pieceUtil';
import ENV from '../../../../env';

const canWhiteKingCastle = ({
  board,
  endPos,
  hasWhiteKingMoved,
  hasWhiteRookLMoved,
  hasWhiteRookRMoved,
}) => {
  const [endX] = getIndexesFromPos(endPos);
  // Case 1: has king previously moved
  // Case 2: castle kingside
  // Case 3: castle queenside

  // Case 1
  if (hasWhiteKingMoved) return false;
  // Case 2
  if (endX === 6) {
    if (hasWhiteRookRMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['e1', 'f1', 'g1'],
        piece: ENV.WHITE_KING,
      })
    ) {
      return false;
    }
    if (board[5][0] === 0 && board[6][0] === 0) return true;
  }
  // Case 3
  else if (endX === 2) {
    if (hasWhiteRookLMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['c1', 'd1', 'e1'],
        piece: ENV.WHITE_KING,
      })
    ) {
      return false;
    }
    if (board[1][0] === 0 && board[2][0] === 0 && board[3][0] === 0)
      return true;
  }
  return false;
};

const canBlackKingCastle = ({
  board,
  endPos,
  hasBlackKingMoved,
  hasBlackRookLMoved,
  hasBlackRookRMoved,
}) => {
  const [endX] = getIndexesFromPos(endPos);
  // Case 1: has king previously moved
  // Case 2: castle queenside
  // Case 3: castle kingside

  // Case 1
  if (hasBlackKingMoved) return false;
  // Case 2
  if (endX === 2) {
    if (hasBlackRookRMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['c8', 'd8', 'e8'],
        piece: ENV.BLACK_KING,
      })
    ) {
      return false;
    }
    if (board[1][7] === 0 && board[2][7] === 0 && board[3][7] === 0)
      return true;
  }
  // Case 3
  else if (endX === 6) {
    if (hasBlackRookLMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['e8', 'f8', 'g8'],
        piece: ENV.BLACK_KING,
      })
    ) {
      return false;
    }
    if (board[5][7] === 0 && board[6][7] === 0) return true;
  }
  return false;
};

export const kingMove = ({
  board,
  startPos,
  endPos,
  piece,
  isCheckingForSquareThreatened = false,
  kingStuff,
}) => {
  let hasWhiteKingMoved,
    hasBlackKingMoved,
    hasWhiteRookLMoved,
    hasWhiteRookRMoved,
    hasBlackRookLMoved,
    hasBlackRookRMoved;
  if (kingStuff != null) {
    hasWhiteKingMoved = kingStuff.hasWhiteKingMoved;
    hasBlackKingMoved = kingStuff.hasBlackKingMoved;
    hasWhiteRookRMoved = kingStuff.hasWhiteRookRMoved;
    hasBlackRookLMoved = kingStuff.hasBlackRookLMoved;
    hasBlackRookRMoved = kingStuff.hasBlackRookRMoved;
  }
  const [startX, startY] = getIndexesFromPos(startPos);
  const [endX, endY] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startX - endX);
  const yDist = Math.abs(startY - endY);

  // Case 1: cannot move into check
  // Case 2: cannot capture own piece
  // Case 3: standard movement
  // Case 4: castle kingside/queenside

  // Case 1
  if (
    !isCheckingForSquareThreatened &&
    isSquareThreatened({ board, pos: endPos, piece })
  ) {
    return { isLegal: false, isCastling: false };
  }
  // Case 2
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false, isCastling: false };
  }
  // Case 3
  else if (
    (xDist === 1 && yDist === 1) ||
    (xDist === 1 && yDist === 0) ||
    (xDist === 0 && yDist === 1)
  ) {
    return { isLegal: true, isCastling: false };
  }
  // Case 4
  else if (!isCheckingForSquareThreatened && xDist === 2 && yDist === 0) {
    if (
      piece === ENV.WHITE_KING &&
      canWhiteKingCastle({
        board,
        endPos,
        hasWhiteKingMoved,
        hasWhiteRookLMoved,
        hasWhiteRookRMoved,
      })
    ) {
      return { isLegal: true, isCastling: true };
    } else if (
      piece === ENV.BLACK_KING &&
      canBlackKingCastle({
        board,
        endPos,
        hasBlackKingMoved,
        hasBlackRookLMoved,
        hasBlackRookRMoved,
      })
    ) {
      return { isLegal: true, isCastling: true };
    }
  }
  return { isLegal: false, isCastling: false };
};
