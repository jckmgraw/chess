import { createSlice } from '@reduxjs/toolkit';
import { initBoard } from './initBoard';
import { getNewBoardFromMove } from '../piece/pieceUtil';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    resetBoard: true,
    board: initBoard(),
    movingPiece: 0,
    movingPieceStartingPos: '',
    isMouseDown: false,
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
  },
});

export const {
  resetBoard,
  setMovingPiece,
  setMovingPieceStartingPos,
  movePiece,
  setMouseDown,
} = boardSlice.actions;

export const selectBoard = (state) => state.board.board;

export default boardSlice.reducer;
