import store from '../../app/store';
import socketIOClient from 'socket.io-client';
import { updateBoard } from '../chess/board/boardSlice';
import {
  setConnStatus,
  setAddPlayerStatus,
  handleUsernameAlreadyTaken,
  setPlayersInLobby,
  setChallengeStatus,
  setChallengeStatusAsync,
  setOpponent,
} from '../lobby/lobbySlice';
import ENV from '../../env';

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
  socket.on('board', (board) => {
    store.dispatch(updateBoard(board));
  });
  // TODO
  socket.on('setPlayersInLobby', (players) => {
    const { opponent } = store.getState().lobby;
    if (opponent.length > 0 && !players.includes(opponent)) {
      console.log('TODO: handle opponent disconnecting from game');
    }
    store.dispatch(setPlayersInLobby(players));
  });
  socket.on('addPlayerToLobbyResponse', (data) => {
    console.log(`addPlayerToLobbyResponse: ${JSON.stringify(data)}`);
    const { username, id, message, playersInLobby } = data;
    const clientUsername = store.getState().lobby.username;
    const clientId = store.getState().lobby.id;
    console.log(
      `username: ${username}, clientUsername: ${clientUsername}, id: ${id}, clientId: ${clientId}`
    );
    if (username === clientUsername && id === clientId) {
      if (message === 'playerExists') {
        store.dispatch(handleUsernameAlreadyTaken());
      } else if (message === 'success') {
        store.dispatch(setPlayersInLobby(playersInLobby));
        store.dispatch(setAddPlayerStatus(ENV.ADD_PLAYER_STATUS_RECEIVED));
      }
    } else if (message === 'success') {
      store.dispatch(setPlayersInLobby(playersInLobby));
    }
  });
  socket.on('challenge', (data) => {
    const { challenger, challengee } = data;
    const { challengeStatus, username } = store.getState().lobby;
    if (challengeStatus == null) console.error('fix this');
    // Case 1: WAITING => your challengee has responded
    // Case 2: IDLING => you have been challenged

    // Case 1
    if (
      challenger.username === username &&
      challengeStatus === ENV.CHALLENGE_STATUS_WAITING &&
      challenger.status !== challengeStatus
    ) {
      console.log('case 1');
      store.dispatch(setChallengeStatus(challenger.status));
    }
    // Case 2
    else if (
      challengee.username === username &&
      challengee.status !== challengeStatus &&
      challengeStatus !== ENV.CHALLENGE_STATUS_ACCEPTED
    ) {
      store.dispatch(setOpponent(challenger.username));
      store.dispatch(
        setChallengeStatusAsync({
          time: 5000,
          status: ENV.CHALLENGE_STATUS_RECEIVED,
        })
      );
    }
  });
  socket.on('serverError', (data) => {
    console.error(`serverError: ${JSON.stringify(data)}`);
  });
  return socket;
};
