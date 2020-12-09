import { configureStore } from '@reduxjs/toolkit';
import { loggingMiddleware } from '../middleware/logging';
import { socketMiddleware, socketInit } from '../middleware/socket';
import boardReducer from '../features/chess/board/boardSlice';

export default configureStore({
  reducer: {
    board: boardReducer,
  },
  middleware: [socketMiddleware(socketInit()), loggingMiddleware],
});
