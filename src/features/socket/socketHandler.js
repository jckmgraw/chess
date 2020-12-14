import store from '../../app/store';
import socketIOClient from 'socket.io-client';
import {
  updateBoard,
  resetBoard,
  setPlayerColor,
  setWhosTurn,
} from '../chess/board/boardSlice';
import {
  setConnStatus,
  setAddPlayerStatus,
  handleUsernameAlreadyTaken,
  setPlayersInLobby,
  setChallengeStatus,
  setChallengeStatusAsync,
  setOpponent,
  setGameStatus,
  setCountdown,
  emitSocketEvent,
} from '../lobby/lobbySlice';
import { isCheckmate } from '../chess/piece/moveLogic/checkmate';
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
  socket.on('game', (data) => {
    const { status, countdown, playerWhite, playerBlack } = data;
    const { gameStatus, username } = store.getState().lobby;
    if (playerWhite === username || playerBlack === username) {
      store.dispatch(setGameStatus(status));
      if (status === ENV.GAME_STATUS_GO && gameStatus !== status) {
        if (playerWhite === username) {
          store.dispatch(setPlayerColor('white'));
        } else if (playerBlack === username) {
          store.dispatch(setPlayerColor('black'));
        }
        store.dispatch(resetBoard());
      } else if (status === ENV.GAME_STATUS_COUNTDOWN) {
        store.dispatch(setCountdown(countdown));
      }
    }
  });
  socket.on('board', (data) => {
    const { playerWhite, playerBlack, board, whosTurn } = data;
    const { username } = store.getState().lobby;
    const boardCopy = JSON.parse(JSON.stringify(board));
    if ([playerWhite, playerBlack].includes(username)) {
      store.dispatch(setWhosTurn(whosTurn));
      store.dispatch(updateBoard(board));
      let king = ENV.WHITE_KING;
      if (whosTurn === 'black') king = ENV.BLACK_KING;
      console.log('--------------------------------------');
      const isWin = isCheckmate({ board: boardCopy, king });
      if (isWin) {
        console.log('YOU GOT CHECKMATED');
        store.dispatch(setGameStatus(ENV.GAME_STATUS_LOSS));
        store.dispatch(emitSocketEvent({ event: 'gameOver' }));
      }
    }
  });
  socket.on('gameOver', (data) => {
    const { playerWhite, playerBlack } = data;
    const { username } = store.getState().lobby;
    if ([playerWhite, playerBlack].includes(username)) {
      store.dispatch(setGameStatus(ENV.GAME_STATUS_WIN));
    }
  });
  socket.on('serverError', (data) => {
    console.error(`serverError: ${JSON.stringify(data)}`);
  });
  return socket;
};
