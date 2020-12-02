import { createSlice } from '@reduxjs/toolkit';
import { initBoard } from './initBoard';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    resetBoard: true,
    board: [],
  },
  reducers: {
    resetBoard: (state) => {
      const board = initBoard();
      console.log(board);
      state.board = board;
    },
    movePiece: (state, action) => {
      // TODO
    },
  },
});

export const { resetBoard, movePiece } = boardSlice.actions;

export const selectBoard = (state) => state.board.board;

export default boardSlice.reducer;
