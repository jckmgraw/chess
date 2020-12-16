import { pawnMove } from './moveLogic/pawnLogic';
import { rookMove } from './moveLogic/rookLogic';
import { knightMove } from './moveLogic/knightLogic';
import { bishopMove } from './moveLogic/bishopLogic';
import { queenMove } from './moveLogic/queenLogic';
import { kingMove } from './moveLogic/kingLogic';
import ENV from '../../../env';
import { isKingInCheck } from './moveLogic/checkmate';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const isMoveLegal = ({
  board,
  startPos,
  endPos,
  kingStuff,
  isCheckingForSquareThreatened,
  isCalledFromIsKingInCheck = false,
}) => {
  const piece = getPieceFromBoardPos(board, startPos);
  const pieceType = Math.abs(piece);

  // Case 1: piece doesn't change position
  // Case 2: moving piece puts king in check
  // Case 3: piece specific logic

  // Case 1
  if (startPos === endPos) return false;

  // Case 2
  if (!isCalledFromIsKingInCheck) {
    let king;
    if (piece > 0) king = ENV.WHITE_KING;
    else if (piece < 0) king = ENV.BLACK_KING;
    const diffBoard = JSON.parse(JSON.stringify(board));
    const [startX, startY] = getIndexesFromPos(startPos);
    const [endX, endY] = getIndexesFromPos(endPos);
    diffBoard[startX][startY] = 0;
    diffBoard[endX][endY] = piece;
    if (isKingInCheck({ board: diffBoard, king })) return false;
  }

  // Case 3
  if (pieceType === ENV.WHITE_PAWN) {
    return pawnMove({
      board,
      startPos,
      endPos,
      piece,
      isCheckingForSquareThreatened,
    });
  } else if (pieceType === ENV.WHITE_ROOK) {
    return rookMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_KNIGHT) {
    return knightMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_BISHOP) {
    return bishopMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_QUEEN) {
    return queenMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_KING) {
    return kingMove({
      board,
      startPos,
      endPos,
      piece,
      kingStuff,
      isCheckingForSquareThreatened,
    });
  } else {
    console.error(
      `unknown piece '${piece}' in isMoveLegal(): startPos: ${startPos}, endPos: ${endPos}`
    );
    return { isLegal: false, isCastling: false };
  }
};

export const isSquaresThreatened = ({ board, positions, piece }) => {
  for (let i = 0; i < positions.length - 1; i++) {
    if (isSquareThreatened({ board, pos: positions[i], piece })) {
      return true;
    }
  }
  return false;
};

export const isSquareThreatened = (params) => {
  const { board, pos, piece, isCapturing, isCalledFromIsKingInCheck } = params;
  const [squareX, squareY] = getIndexesFromPos(pos);
  let boardCopy = JSON.parse(JSON.stringify(board));
  let tempIsCapturing = true;
  if (!isCapturing) {
    tempIsCapturing = false;
  }
  if (tempIsCapturing === true) {
    console.log('isCapturing entered');
    boardCopy[squareX][squareY] = 0;
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const startPos = getPosFromIndexes([x, y]);
      if (piece > 0 && board[x][y] < 0) {
        // console.log(`board[${x}][${y}] = ${piece}`);
        const { isLegal } = isMoveLegal({
          board: boardCopy,
          startPos,
          endPos: pos,
          isCheckingForSquareThreatened: true,
          isCalledFromIsKingInCheck,
        });
        if (isLegal) {
          return true;
        }
      } else if (piece < 0 && board[x][y] > 0) {
        // console.log(`board[${x}][${y}] = ${piece}`);
        const { isLegal } = isMoveLegal({
          board: boardCopy,
          startPos,
          endPos: pos,
          isCheckingForSquareThreatened: true,
          isCalledFromIsKingInCheck,
        });
        if (isLegal) {
          return true;
        }
      }
    }
  }
  return false;
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
  const [xLetter, yOff] = pos.split('');
  const y = yOff - 1;
  let x;
  for (let i = 0; i < 8; i++) {
    if (xLetter === letters[i]) {
      x = i;
      break;
    }
  }
  return [x, y];
};

export const getColorFromBoardPos = (board, pos) => {
  const piece = getPieceFromBoardPos(board, pos);
  if (piece > 0) return 'white';
  if (piece < 0) return 'black';
  return 'only use this function in PieceDraggable onMouseUp()';
};

export const getPosFromIndexes = (indexes) => {
  const [x, y] = indexes;
  return `${letters[x]}${y + 1}`;
};

export const getPieceFromBoardPos = (board, boardPos) => {
  const [x, y] = getIndexesFromPos(boardPos);
  return board[x][y];
};

export const getNewBoardFromMove = ({
  board,
  startPos,
  endPos,
  isCastling,
}) => {
  const piece = getPieceFromBoardPos(board, startPos);
  const [startX, startY] = getIndexesFromPos(startPos);
  const [endX, endY] = getIndexesFromPos(endPos);
  const boardCopy = board;

  if (isCastling) {
    // white
    if (endY === 0) {
      // kingside
      if (endX === 6) {
        boardCopy[7][endY] = 0;
        boardCopy[5][endY] = ENV.WHITE_ROOK;
      }
      // queenside
      else if (endX === 2) {
        boardCopy[0][endY] = 0;
        boardCopy[3][endY] = ENV.WHITE_ROOK;
      }
    }
    // black
    else if (endY === 7) {
      // kingside
      if (endX === 6) {
        boardCopy[7][endY] = 0;
        boardCopy[5][endY] = ENV.BLACK_ROOK;
      }
      // queenside
      else if (endX === 2) {
        boardCopy[0][endY] = 0;
        boardCopy[3][endY] = ENV.BLACK_ROOK;
      }
    } else {
      console.error('getnewBoardFromMove() isCastling flag');
    }
  }
  boardCopy[startX][startY] = 0;
  boardCopy[endX][endY] = piece;
  return boardCopy;
};
