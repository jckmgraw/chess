import { pawnMove } from './moveLogic/pawnLogic';
import { rookMove } from './moveLogic/rookLogic';
import { knightMove } from './moveLogic/knightLogic';
import { bishopMove } from './moveLogic/bishopLogic';
import { queenMove } from './moveLogic/queenLogic';
import ENV from '../../../env';

export const isMoveLegal = (board, startPos, endPos) => {
  if (startPos === endPos) return false;
  const piece = getPieceFromBoardPos(board, startPos);
  const pieceType = Math.abs(piece);
  if (pieceType === ENV.WHITE_PAWN) {
    return pawnMove(board, startPos, endPos, piece);
  } else if (pieceType === ENV.WHITE_ROOK) {
    return rookMove(board, startPos, endPos, piece);
  } else if (pieceType === ENV.WHITE_KNIGHT) {
    return knightMove(board, startPos, endPos, piece);
  } else if (pieceType === ENV.WHITE_BISHOP) {
    return bishopMove(board, startPos, endPos, piece);
  } else if (pieceType === ENV.WHITE_QUEEN) {
    return queenMove(board, startPos, endPos, piece);
  } else if (pieceType === ENV.WHITE_KING) {
    console.error('this should be handled in PieceDraggable.js');
    return false;
  } else {
    console.error('unknown piece in isMoveLegal()');
    return false;
  }
};

export const isWhiteRookL = (startPos, piece) => {
  if (piece === ENV.WHITE_ROOK && startPos === 'a1') {
    return true;
  }
  return false;
};

export const isWhiteRookR = (startPos, piece) => {
  if (piece === ENV.WHITE_ROOK && startPos === 'h1') {
    return true;
  }
  return false;
};

export const isBlackRookL = (startPos, piece) => {
  if (piece === ENV.BLACK_ROOK && startPos === 'h8') {
    return true;
  }
  return false;
};

export const isBlackRookR = (startPos, piece) => {
  if (piece === ENV.BLACK_ROOK && startPos === 'a8') {
    return true;
  }
  return false;
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

export const getNewBoardFromMove = ({
  board,
  startPos,
  endPos,
  isCastling,
}) => {
  const piece = getPieceFromBoardPos(board, startPos);
  const [startRow, startCol] = getIndexesFromPos(startPos);
  const [endRow, endCol] = getIndexesFromPos(endPos);
  const boardCopy = board;

  if (isCastling) {
    // white
    if (endRow === 0) {
      // kingside
      if (endCol === 6) {
        boardCopy[endRow][7] = 0;
        boardCopy[endRow][5] = ENV.WHITE_ROOK;
      }
      // queenside
      else if (endCol === 2) {
        boardCopy[endRow][0] = 0;
        boardCopy[endRow][3] = ENV.WHITE_ROOK;
      }
    }
    // black
    else if (endRow === 7) {
      // kingside
      if (endCol === 1) {
        boardCopy[endRow][0] = 0;
        boardCopy[endRow][2] = ENV.BLACK_ROOK;
      }
      // queenside
      else if (endCol === 5) {
        boardCopy[endRow][7] = 0;
        boardCopy[endRow][4] = ENV.BLACK_ROOK;
      }
    } else {
      console.error('getnewBoardFromMove() isCastling flag');
    }
  }
  boardCopy[startRow][startCol] = 0;
  boardCopy[endRow][endCol] = piece;
  return boardCopy;
};
