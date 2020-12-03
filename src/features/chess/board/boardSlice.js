import { createSlice } from '@reduxjs/toolkit';
import { initBoard } from './initBoard';
import { getNewBoardFromMove, getIndexesFromPos } from '../piece/pieceUtil';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    resetBoard: true,
    board: initBoard(),
    movingPiece: 0,
    movingPieceStartingPos: '',
    isMouseDown: false,
    hasWhiteCastled: false,
    hasBlackCastled: false,
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
      const endPos = action.payload;
      console.log(`movePiece() endPos: ${endPos}`);
      const board = getNewBoardFromMove(
        state.board,
        state.movingPieceStartingPos,
        endPos
      );
      state.movingPiece = 0;
      state.movingPieceStartingPos = '';
      state.board = board;
    },
    setMouseDown: (state, action) => {
      state.isMouseDown = action.payload;
    },
    illegalMove: (state) => {
      const [row, col] = getIndexesFromPos(state.movingPieceStartingPos);
      const boardCopy = state.board;
      boardCopy[row][col] = state.movingPiece;
      state.board = boardCopy;
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

export default boardSlice.reducer;
