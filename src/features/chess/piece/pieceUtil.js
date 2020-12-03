import { pawnMove } from './legalMoves';
import ENV from '../../../env';

export const isMoveLegal = (board, startPos, endPos) => {
  if (startPos === endPos) return false;
  const piece = getPieceFromBoardPos(board, startPos);
  if (Math.abs(piece) === ENV.WHITE_PAWN) {
    return pawnMove(board, startPos, endPos, piece);
  } else if (Math.abs(piece) === ENV.WHITE_ROOK) {
    return false;
  } else if (Math.abs(piece) === ENV.WHITE_KNIGHT) {
    return false;
  } else if (Math.abs(piece) === ENV.WHITE_BISHOP) {
    return false;
  } else if (Math.abs(piece) === ENV.WHITE_QUEEN) {
    return false;
  } else if (Math.abs(piece) === ENV.WHITE_KING) {
    return false;
  } else {
    console.error('unknown piece in isMoveLegal()');
    return false;
  }
};

export const getIndexesFromPos = (pos) => {
  const [colLetter, row] = pos.split('');
  let col;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let i = 0; i < 8; i++) {
    if (colLetter === letters[i]) {
      col = i;
      break;
    }
  }
  return [row - 1, col];
};

export const getPieceFromBoardPos = (board, boardPos) => {
  const boardPosSplit = boardPos.split('');
  const colLetter = boardPosSplit[0];
  const rowIndex = boardPosSplit[1] - 1;
  let colIndex;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let i = 0; i < 8; i++) {
    if (colLetter === letters[i]) {
      colIndex = i;
      break;
    }
  }
  if (colIndex == null)
    console.error('unknown colIndex in getPieceFromBoardPos()');
  return board[rowIndex][colIndex];
};

export const getNewBoardFromMove = (board, startPos, endPos) => {
  const piece = getPieceFromBoardPos(board, startPos);
  const boardCopy = board;

  const startPosSplit = startPos.split('');
  const endPosSplit = endPos.split('');

  const startColLetter = startPosSplit[0];
  const endColLetter = endPosSplit[0];

  const startRowIndex = startPosSplit[1] - 1;
  const endRowIndex = endPosSplit[1] - 1;

  let startColIndex, endColIndex;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let i = 0; i < 8; i++) {
    if (startColLetter === letters[i]) {
      startColIndex = i;
    }
    if (endColLetter === letters[i]) {
      endColIndex = i;
    }
  }
  boardCopy[startRowIndex][startColIndex] = 0;
  boardCopy[endRowIndex][endColIndex] = piece;
  return boardCopy;
};
