import ENV from '../../../env';

export const initBoard = () => {
  console.log(`env: ${ENV.WHITE_ROOK}`);
  const rookCol = [
    ENV.WHITE_ROOK,
    ENV.WHITE_PAWN,
    0,
    0,
    0,
    0,
    ENV.BLACK_PAWN,
    ENV.BLACK_ROOK,
  ];
  const knightCol = [
    ENV.WHITE_KNIGHT,
    ENV.WHITE_PAWN,
    0,
    0,
    0,
    0,
    ENV.BLACK_PAWN,
    ENV.BLACK_KNIGHT,
  ];
  const bishopCol = [
    ENV.WHITE_BISHOP,
    ENV.WHITE_PAWN,
    0,
    0,
    0,
    0,
    ENV.BLACK_PAWN,
    ENV.BLACK_BISHOP,
  ];
  const col4 = [
    ENV.WHITE_QUEEN,
    ENV.WHITE_PAWN,
    0,
    0,
    0,
    0,
    ENV.BLACK_PAWN,
    ENV.BLACK_KING,
  ];
  const col5 = [
    ENV.WHITE_KING,
    ENV.WHITE_PAWN,
    0,
    0,
    0,
    0,
    ENV.BLACK_PAWN,
    ENV.BLACK_QUEEN,
  ];
  return [
    rookCol,
    knightCol,
    bishopCol,
    col4,
    col5,
    bishopCol,
    knightCol,
    rookCol,
  ];
};
