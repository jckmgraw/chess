import ENV from '../../../../env';
import {
  getPosFromIndexes,
  isMoveLegal,
  isSquareThreatened,
} from '../pieceUtil';

export const isKingInCheck = ({ board, king }) => {
  console.log(board);
  console.log(`king: ${king}`);
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y] === king) {
        const pos = getPosFromIndexes([x, y]);
        console.log(`pos: ${pos}`);
        if (
          isSquareThreatened({
            board,
            pos,
            piece: king,
            isCapturing: false,
            isCalledFromIsKingInCheck: true,
          })
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

// TODO
export const isCheckmate = ({ board, isWhite }) => {
  // Case 1: king is in check (assumed when calling function)
  // Case 2: can king move out of check
  // Case 3: - for each piece 'X'
  //         - for each legal move of 'X'
  //         - is king square threatened?

  // Case 2
  let kingPos, kingX, kingY;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y] === ENV.WHITE_KING) {
        kingPos = getPosFromIndexes([x, y]);
        kingX = x;
        kingY = y;
        break;
      }
    }
  }
  if (kingPos == null) console.error('issue in isCheckmate');
  for (let x = kingX - 1; x < kingX + 3; x++) {
    for (let y = kingY - 1; y < kingY + 3; y++) {
      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        const pos = getPosFromIndexes([x, y]);
        if (
          board[x][y] <= 0 &&
          isSquareThreatened({
            board,
            pos: pos,
            piece: ENV.WHITE_KING,
          })
        ) {
          return false;
        }
      }
    }
  }
  const boardCalc = JSON.parse(JSON.stringify(board));
  // Case 3
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const piece = boardCalc[x][y];
      const startPos = getPosFromIndexes([x, y]);
      boardCalc[x][y] = 0;
      if (piece > 0) {
        for (let x2 = 0; x2 < 8; x2++) {
          for (let y2 = 0; y2 < 8; y2++) {
            const endPos = getPosFromIndexes([x2, y2]);
            if (isMoveLegal({ board: boardCalc, startPos, endPos, piece })) {
            }
          }
        }
      }
    }
  }
};
