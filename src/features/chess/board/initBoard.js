import ENV from '../../../env';

export const initBoard = () => {
  console.log(`env: ${ENV.WHITE_ROOK}`);
  const whiteBackRow = [
    ENV.WHITE_ROOK,
    ENV.WHITE_KNIGHT,
    ENV.WHITE_BISHOP,
    ENV.WHITE_QUEEN,
    ENV.WHITE_KING,
    ENV.WHITE_BISHOP,
    ENV.WHITE_KNIGHT,
    ENV.WHITE_ROOK,
  ];
  const blackBackRow = [
    ENV.BLACK_ROOK,
    ENV.BLACK_KNIGHT,
    ENV.BLACK_BISHOP,
    ENV.BLACK_KING,
    ENV.BLACK_QUEEN,
    ENV.BLACK_BISHOP,
    ENV.BLACK_KNIGHT,
    ENV.BLACK_ROOK,
  ];
  let whitePawnRow = [];
  let blackPawnRow = [];
  for (let i = 0; i < 8; i++) {
    whitePawnRow.push(ENV.WHITE_PAWN);
    blackPawnRow.push(ENV.BLACK_PAWN);
  }
  const emptyRow = [null, null, null, null, null, null, null, null];
  return [
    whiteBackRow,
    whitePawnRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    blackPawnRow,
    blackBackRow,
  ];
};
