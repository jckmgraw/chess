import socketIOClient from 'socket.io-client';
import store from '../app/store';
import { setConnStatus } from '../features/chess/board/boardSlice';
import ENV from '../env';

export const socketMiddleware = (socket) => () => (next) => (action) => {
  if (socket == null) {
    return next(action);
  }
  if (action.type === 'board/emitSocketEvent') {
    const { event, message } = action.payload;
    socket.emit(event, message);
  } else if (action.type === 'board/closeSocket' && socket.connected) {
    console.log('board/closeSocket middleware');
    socket.close();
  } else if (action.type === 'board/openSocket' && !socket.connected) {
    console.log('board/openSocket middleware');
    socket.connect();
  }
  next(action);
};

export const socketInit = () => {
  console.log('socketInit()');
  const socket = socketIOClient(ENV.SOCKET_IO_ENDPOINT);
  socket.on('connect', () => {
    console.log('socket connect');
    store.dispatch(setConnStatus(ENV.CONN_STATUS_CONNECTED));
  });
  socket.on('disconnect', () => {
    console.log('socket disconnect');
    store.dispatch(setConnStatus(ENV.CONN_STATUS_NO_CONNECTION));
  });
  socket.on('reconnect', (attemptNumber) => {
    console.log(`socket reconnect - attemptNumber: ${attemptNumber}`);
    store.dispatch(setConnStatus(ENV.CONN_STATUS_CONNECTED));
  });
  socket.on('reconnecting', (attemptNumber) => {
    console.log(`socket reconnecting - attemptNumber: ${attemptNumber}`);
    store.dispatch(setConnStatus(ENV.CONN_STATUS_CONNECTING));
  });
  socket.on('board', (data) => {
    console.log(`board: ${data}`);
  });
  socket.on('serverError', (data) => {
    console.error(`serverError: ${JSON.stringify(data)}`);
  });
  return socket;
};
