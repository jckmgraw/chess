import { getIndexesFromPos, getPieceFromBoardPos } from '../pieceUtil';
import ENV from '../../../../env';

const canWhiteKingCastle = ({
  board,
  endPos,
  hasWhiteKingMoved,
  hasWhiteRookLMoved,
  hasWhiteRookRMoved,
}) => {
  const [endRow, endCol] = getIndexesFromPos(endPos);
  // Case 1: has king previously moved
  // Case 2: castle kingside
  // Case 3: castle queenside
  // Case 4: check situations (TODO)

  // Case 1
  if (hasWhiteKingMoved) return false;
  // Case 2
  if (endCol === 6) {
    if (hasWhiteRookRMoved) return false;
    if (board[0][5] === 0 && board[0][6] === 0) return true;
  }
  // Case 3
  else if (endCol === 2) {
    if (hasWhiteRookLMoved) return false;
    if (board[0][1] === 0 && board[0][2] === 0 && board[0][3] === 0)
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
  const [endRow, endCol] = getIndexesFromPos(endPos);
  // Case 1: has king previously moved
  // Case 2: castle kingside
  // Case 3: castle queenside
  // Case 4: check situations (TODO)

  // Case 1
  if (hasBlackKingMoved) return false;
  // Case 2
  if (endCol === 1) {
    if (hasBlackRookRMoved) return false;
    if (board[7][1] === 0 && board[7][2] === 0) return true;
  }
  // Case 3
  else if (endCol === 5) {
    if (hasBlackRookLMoved) return false;
    if (board[7][4] === 0 && board[7][5] === 0 && board[7][6] === 0)
      return true;
  }
  return false;
};

export const kingMove = ({ board, startPos, endPos, piece, kingStuff }) => {
  const {
    hasWhiteKingMoved,
    hasBlackKingMoved,
    hasWhiteRookLMoved,
    hasWhiteRookRMoved,
    hasBlackRookLMoved,
    hasBlackRookRMoved,
  } = kingStuff;
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startCol - endCol);
  const yDist = Math.abs(startRow - endRow);

  // Case 1: cannot capture own piece
  // Case 2: standard movement
  // Case 3: castle kingside/queenside
  // Case 4: cannot move into check (TODO)

  // Case 1
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    console.log('cannot capture own piece');
    return { isMoveLegal: false, isCastling: false };
  }
  // Case 2
  else if (
    (xDist === 1 && yDist === 1) ||
    (xDist === 1 && yDist === 0) ||
    (xDist === 0 && yDist === 1)
  ) {
    console.log('standard movement');
    return { isMoveLegal: true, isCastling: false };
  }
  // Case 3
  else if (xDist === 2 && yDist === 0) {
    console.log('checking castling...');
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
      console.log('white can castle');
      return { isMoveLegal: true, isCastling: true };
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
      console.log('black can castle');
      return { isMoveLegal: true, isCastling: true };
    }
  }
  return { isMoveLegal: false, isCastling: false };
};
