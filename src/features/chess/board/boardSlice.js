import { createSlice } from '@reduxjs/toolkit';
import { initBoard } from './initBoard';
import {
  getNewBoardFromMove,
  getIndexesFromPos,
  isWhiteRookL,
  isWhiteRookR,
  isBlackRookL,
  isBlackRookR,
} from '../piece/pieceUtil';
import ENV from '../../../env';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    resetBoard: true,
    board: initBoard(),
    movingPiece: 0,
    movingPieceStartingPos: '',
    isMouseDown: false,
    hasWhiteKingMoved: false,
    hasBlackKingMoved: false,
    hasWhiteRookLMoved: false,
    hasWhiteRookRMoved: false,
    hasBlackRookLMoved: false,
    hasBlackRookRMoved: false,
  },
  reducers: {
    resetBoard: (state) => {
      const board = initBoard();
      state.resetBoard = false;
      state.board = board;
    },
    setMovingPiece: (state, action) => {
      state.movingPiece = action.payload;
    },
    setMovingPieceStartingPos: (state, action) => {
      console.log(`movingPieceStartingPos: ${action.payload}`);
      state.movingPieceStartingPos = action.payload;
    },
    movePiece: (state, action) => {
      const { endPos, startPos, piece, isCastling } = action.payload;
      console.log(`movePiece() endPos: ${endPos}`);
      const board = getNewBoardFromMove({
        board: state.board,
        startPos: state.movingPieceStartingPos,
        endPos,
        isCastling,
      });
      if (piece === ENV.WHITE_KING) {
        state.hasWhiteKingMoved = true;
      } else if (piece === ENV.BLACK_KING) {
        state.hasBlackKingMoved = true;
      } else if (isWhiteRookL(startPos, piece)) {
        state.hasWhiteRookLMoved = true;
      } else if (isWhiteRookR(startPos, piece)) {
        state.hasWhiteRookRMoved = true;
      } else if (isBlackRookL(startPos, piece)) {
        state.hasBlackRookLMoved = true;
      } else if (isBlackRookR(startPos, piece)) {
        state.hasBlackRookRMoved = true;
      }
      state.movingPiece = 0;
      state.movingPieceStartingPos = '';
      state.board = board;
    },
    setMouseDown: (state, action) => {
      state.isMouseDown = action.payload;
    },
    illegalMove: (state) => {
      const [x, y] = getIndexesFromPos(state.movingPieceStartingPos);
      state.board[x][y] = state.movingPiece;
      state.movingPiece = 0;
      state.movingPieceStartingPos = '';
    },
  },
});

export const {
  resetBoard,
  setMovingPiece,
  setMovingPieceStartingPos,
  movePiece,
  setMouseDown,
  illegalMove,
} = boardSlice.actions;

export const selectBoard = (state) => state.board.board;
export const selectIsMouseDown = (state) => state.board.isMouseDown;
export const selectMovingPiece = (state) => state.board.movingPiece;
export const selectMovingPieceStartingPos = (state) =>
  state.board.movingPieceStartingPos;

export const selectHasWhiteKingMoved = (state) => state.board.hasWhiteKingMoved;
export const selectHasBlackKingMoved = (state) => state.board.hasBlackKingMoved;
export const selectHasWhiteRookLMoved = (state) =>
  state.board.hasWhiteRookLMoved;
export const selectHasWhiteRookRMoved = (state) =>
  state.board.hasWhiteRookRMoved;
export const selectHasBlackRookLMoved = (state) =>
  state.board.hasBlackRookLMoved;
export const selectHasBlackRookRMoved = (state) =>
  state.board.hasBlackRookRMoved;

export default boardSlice.reducer;
