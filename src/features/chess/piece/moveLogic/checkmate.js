import {
  getPosFromIndexes,
  isMoveLegal,
  isSquareThreatened,
} from '../pieceUtil';

export const isKingInCheck = ({ board, king }) => {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y] === king) {
        const pos = getPosFromIndexes([x, y]);
        console.log(`isKingInCheck pos: ${pos}`);
        console.log(board);
        if (
          isSquareThreatened({
            board,
            pos,
            piece: king,
            isCapturing: false,
            isCalledFromIsKingInCheck: true,
          })
        ) {
          console.log(`isKingInCheck square ${pos} is THREATENED`);
          return true;
        }
      }
    }
  }
  return false;
};

export const isCheckmate = ({ board, king }) => {
  // Case 1: king is in check
  // Case 2: can king move out of check
  // Case 3: - for each piece 'X'
  //         - for each legal move of 'X'
  //         - is king square threatened?

  // Case 1
  if (!isKingInCheck({ board, king })) {
    console.log('FALSE: Case 1');
    return false;
  }

  // Case 2
  let kingPos, kingX, kingY;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y] === king) {
        kingPos = getPosFromIndexes([x, y]);
        kingX = x;
        kingY = y;
        break;
      }
    }
  }
  console.log(`kingPos for case2: ${kingPos}`);
  if (kingPos == null) console.error('issue in isCheckmate');
  for (let x = kingX - 1; x < kingX + 2; x++) {
    for (let y = kingY - 1; y < kingY + 2; y++) {
      console.log(`surrounding king square: [${x}, ${y}]`);
      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        const pos = getPosFromIndexes([x, y]);
        if ((king > 0 && board[x][y] <= 0) || (king < 0 && board[x][y] >= 0)) {
          console.log(
            `Case 2 partial: board[${x}][${y}] = ${board[x][y]}, king: ${king}`
          );
          if (
            !isSquareThreatened({
              board,
              pos: pos,
              piece: king,
              isCapturing: false,
              isCalledFromIsKingInCheck: false,
            })
          ) {
            console.log(`FALSE: Case 2: pos: ${pos}, piece: ${king}`);
            return false;
          }
        }
      }
    }
  }
  // Case 3
  const boardCopy = JSON.parse(JSON.stringify(board));
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const piece = boardCopy[x][y];
      const startPos = getPosFromIndexes([x, y]);
      if ((king > 0 && piece > 0) || (king < 0 && piece < 0)) {
        for (let x2 = 0; x2 < 8; x2++) {
          for (let y2 = 0; y2 < 8; y2++) {
            const endPos = getPosFromIndexes([x2, y2]);
            console.log(`Case 3: ${startPos} => ${endPos}, piece: ${piece}`);
            const { isLegal } = isMoveLegal({
              board: boardCopy,
              startPos,
              endPos,
              piece,
            });
            if (isLegal) {
              console.log(
                `FALSE: Case 3: ${startPos} => ${endPos}, piece: ${piece}`
              );
              return false;
            }
          }
        }
      }
    }
  }
  return true;
};
