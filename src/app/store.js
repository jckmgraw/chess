import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import boardReducer from '../features/chess/board/boardSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
  },
});
