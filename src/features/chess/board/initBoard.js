import ENV from '../../../env';

export const getBoardSizing = ({
  windowWidth,
  windowHeight,
  mouseX,
  mouseY,
}) => {
  const boardContainerPadding = 20;
  const boardPadding = 20;
  const boardPaddingTotal = boardPadding * 2 + boardContainerPadding * 2;
  const boardSize = Math.min(
    windowWidth - boardPaddingTotal,
    windowHeight - boardPaddingTotal
  );
  let excessX, excessY;
  if (windowWidth > windowHeight) {
    excessX = (windowWidth - boardSize) / 2;
    excessY = boardPaddingTotal / 2;
  } else {
    excessX = boardPaddingTotal / 2;
    excessY = (windowHeight - boardSize) / 2;
  }
  const positionInfo = {
    boardSize,
    mouseX,
    mouseY,
    excessX,
    excessY,
  };
  return { boardContainerPadding, boardSize, boardPadding, positionInfo };
};

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
