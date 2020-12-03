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
    mouseX: 0,
    mouseY: 0,
    mouseHoverSquare: '',
  },
  reducers: {
    resetBoard: (state) => {
      const board = initBoard();
      state.resetBoard = false;
      state.board = board;
    },
    setMovingPiece: (state, action) => {
      console.log(`movingPiece: ${action.payload}`);
      state.movingPiece = action.payload;
    },
    setMovingPieceStartingPos: (state, action) => {
      console.log(`movingPieceStartingPos: ${action.payload}`);
      state.movingPieceStartingPos = action.payload;
    },
    movePiece: (state) => {
      const endPos = state.mouseHoverSquare;
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
      console.log(`isMouseDown: ${action.payload}`);
      state.isMouseDown = action.payload;
    },
    setMousePos: (state, action) => {
      const { x, y } = action.payload;
      state.mouseX = x;
      state.mouseY = y;
    },
    setMouseHoverSquare: (state, action) => {
      const mouseHoverSquare = action.payload;
      console.log(`mouseHoverSquare: ${mouseHoverSquare}`);
      console.log(`movingPiece: ${state.movingPiece}`);
      state.mouseHoverSquare = mouseHoverSquare;
      if (state.movingPiece !== 0) {
        movePiece();
      }
    },
  },
});

export const {
  resetBoard,
  setMovingPiece,
  setMovingPieceStartingPos,
  movePiece,
  setMouseDown,
  setMousePos,
  setMouseHoverSquare,
} = boardSlice.actions;

export const selectBoard = (state) => state.board.board;

export default boardSlice.reducer;
