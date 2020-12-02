import ENV from '../../../env';

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

export const getStringFromPiece = (piece) => {
  if (piece === ENV.WHITE_PAWN) {
    return 'white pawn';
  } else if (piece === ENV.BLACK_PAWN) {
    return 'black pawn';
  } else if (piece === ENV.WHITE_ROOK) {
    return 'white rook';
  } else if (piece === ENV.BLACK_ROOK) {
    return 'black rook';
  } else if (piece === ENV.WHITE_KNIGHT) {
    return 'white knight';
  } else if (piece === ENV.BLACK_KNIGHT) {
    return 'black knight';
  } else if (piece === ENV.WHITE_BISHOP) {
    return 'white bishop';
  } else if (piece === ENV.BLACK_BISHOP) {
    return 'black bishop';
  } else if (piece === ENV.WHITE_QUEEN) {
    return 'white queen';
  } else if (piece === ENV.BLACK_QUEEN) {
    return 'black queen';
  } else if (piece === ENV.WHITE_KING) {
    return 'white king';
  } else if (piece === ENV.BLACK_KING) {
    return 'black king';
  }
};
