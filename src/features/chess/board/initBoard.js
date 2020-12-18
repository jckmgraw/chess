import ENV from '../../../env';

export const getBoardSizing = ({
  windowWidth,
  windowHeight,
  mouseX,
  mouseY,
}) => {
  const boardContainerPadding = ENV.BOARD_CONTAINER_PADDING;
  const boardPadding = ENV.BOARD_PADDING;
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
    boardPadding,
  };
  return { boardContainerPadding, boardSize, boardPadding, positionInfo };
};

const debugCheckmateSituation1 = () => {
  const col1 = [0, ENV.WHITE_PAWN, 0, 0, 0, 0, ENV.BLACK_PAWN, 0];
  const col2 = [0, 0, 0, 0, 0, 0, 0, 0];
  const col3 = [0, 0, 0, 0, 0, 0, 0, 0];
  const col4 = [0, 0, 0, 0, 0, 0, 0, 0];
  const col5 = [0, 0, 0, 0, 0, 0, 0, 0];
  const col6 = [
    ENV.WHITE_ROOK,
    ENV.WHITE_PAWN,
    ENV.WHITE_PAWN,
    ENV.BLACK_KNIGHT,
    0,
    0,
    0,
    0,
  ];
  const col7 = [0, 0, 0, 0, 0, ENV.BLACK_QUEEN, 0, ENV.BLACK_KING];
  const col8 = [
    0,
    ENV.WHITE_KING,
    ENV.WHITE_PAWN,
    ENV.BLACK_BISHOP,
    0,
    0,
    ENV.BLACK_PAWN,
    0,
  ];
  return [col1, col2, col3, col4, col5, col6, col7, col8];
};

export const initBoard = () => {
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
    ENV.BLACK_QUEEN,
  ];
  const col5 = [
    ENV.WHITE_KING,
    ENV.WHITE_PAWN,
    0,
    0,
    0,
    0,
    ENV.BLACK_PAWN,
    ENV.BLACK_KING,
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
