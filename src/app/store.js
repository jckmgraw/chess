import { configureStore } from '@reduxjs/toolkit';
import { loggingMiddleware } from '../middleware/logging';
import boardReducer from '../features/chess/board/boardSlice';

export default configureStore({
  reducer: {
    board: boardReducer,
  },
  middleware: [loggingMiddleware],
});
