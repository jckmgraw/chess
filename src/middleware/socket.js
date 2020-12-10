import socketIOClient from 'socket.io-client';
import store from '../app/store';
import { setConnStatus, updateBoard } from '../features/chess/board/boardSlice';
import ENV from '../env';

export const socketMiddleware = (socket) => () => (next) => (action) => {
  if (socket == null) {
    return next(action);
  }
  if (action.type === 'board/emitSocketEvent') {
    const { event, message } = action.payload;
    if (event === 'processMove') {
      const board = store.getState().board.board;
      socket.emit(event, board);
    } else if (event === 'addPlayerToLobby') {
      const username = store.getState().board.username;
      socket.emit(event, username);
    }
  } else if (action.type === 'board/closeSocket' && socket.connected) {
    socket.close();
  } else if (action.type === 'board/openSocket' && !socket.connected) {
    socket.connect();
  }
  next(action);
};

export const socketInit = () => {
  console.log('socketInit()');
  const socket = socketIOClient(ENV.SOCKET_IO_ENDPOINT);
  socket.on('connect', () => {
    store.dispatch(setConnStatus(ENV.CONN_STATUS_CONNECTED));
  });
  socket.on('disconnect', () => {
    store.dispatch(setConnStatus(ENV.CONN_STATUS_NO_CONNECTION));
  });
  socket.on('reconnect', (attemptNumber) => {
    store.dispatch(setConnStatus(ENV.CONN_STATUS_CONNECTED));
  });
  socket.on('reconnecting', (attemptNumber) => {
    store.dispatch(setConnStatus(ENV.CONN_STATUS_CONNECTING));
  });
  socket.on('board', (data) => {
    store.dispatch(updateBoard(data));
  });
  socket.on('addPlayerToLobbyResponse', (data) => {
    if (data === 'playerExists') {
      console.log('player exists');
    } else if (data === 'success') {
      // store.dispatch(setUsername());
    }
  });
  socket.on('serverError', (data) => {
    console.error(`serverError: ${JSON.stringify(data)}`);
  });
  return socket;
};
