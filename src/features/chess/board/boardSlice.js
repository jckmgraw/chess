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
import { isCheckmate } from '../piece/moveLogic/checkmate';
import { emitSocketEvent, setGameStatus } from '../../lobby/lobbySlice';
import ENV from '../../../env';

// TODO: move socket logic to new slice
export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    resetBoard: true,
    board: initBoard(),
    movingPiece: 0,
    movingPieceStartingPos: '',
    isMouseDown: false,
    // castling
    hasWhiteKingMoved: false,
    hasBlackKingMoved: false,
    hasWhiteRookLMoved: false,
    hasWhiteRookRMoved: false,
    hasBlackRookLMoved: false,
    hasBlackRookRMoved: false,
    // check, checkmate
    isWhiteInCheck: false,
    isBlackInCheck: false,

    playerColor: 'white',
    whosTurn: 'white',
  },
  reducers: {
    resetBoard: (state) => {
      const board = initBoard();
      state.resetBoard = false;
      state.whosTurn = 'white';
      state.board = board;
    },
    updateBoard: (state, action) => {
      state.board = action.payload;
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
      if (state.whosTurn === 'white') state.whosTurn = 'black';
      else if (state.whosTurn === 'black') state.whosTurn = 'white';
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
    setIsWhiteInCheck: (state, action) => {
      state.isWhiteInCheck = action.payload;
    },
    setIsBlackInCheck: (state, action) => {
      state.isBlackInCheck = action.payload;
    },
    setPlayerColor: (state, action) => {
      state.playerColor = action.payload;
    },
    toggleTurn: (state) => {
      state.whosTurn = !state.whosTurn;
    },
    setWhosTurn: (state, action) => {
      state.whosTurn = action.payload;
    },
  },
});

export const {
  resetBoard,
  updateBoard,
  setMovingPiece,
  setMovingPieceStartingPos,
  movePiece,
  setMouseDown,

  illegalMove,
  setIsWhiteInCheck,
  setIsBlackInCheck,

  setPlayerColor,
  toggleTurn,
  setWhosTurn,
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

export const selectIsWhiteInCheck = (state) => state.board.isWhiteInCheck;
export const selectIsBlackInCheck = (state) => state.board.isBlackInCheck;

export const selectPlayerColor = (state) => state.board.playerColor;
export const selectWhosTurn = (state) => state.board.whosTurn;

export default boardSlice.reducer;
