import { configureStore } from '@reduxjs/toolkit';
import { loggingMiddleware } from '../middleware/logging';
import counterReducer from '../features/counter/counterSlice';
import boardReducer from '../features/chess/board/boardSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
  },
  middleware: [loggingMiddleware],
});
