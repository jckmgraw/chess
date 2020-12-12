import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loggingMiddleware } from '../middleware/logging';
import { socketMiddleware } from '../middleware/socket';
import { socketInit } from '../features/socket/socketHandler';
import lobbyReducer from '../features/lobby/lobbySlice';
import boardReducer from '../features/chess/board/boardSlice';

export default configureStore({
  reducer: {
    lobby: lobbyReducer,
    board: boardReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
    socketMiddleware(socketInit()),
    loggingMiddleware,
  ],
});
