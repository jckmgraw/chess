import store from '../app/store';
import ENV from '../env';

export const socketMiddleware = (socket) => () => (next) => (action) => {
  if (socket == null) {
    return next(action);
  }
  if (action.type === 'lobby/emitSocketEvent') {
    const { event } = action.payload;
    if (event === 'processMove') {
      const {
        board,
        playerColor,
        whosTurn,
        recentMove,
      } = store.getState().board;
      const { username, opponent } = store.getState().lobby;
      let playerWhite, playerBlack;
      if (playerColor === 'white') {
        playerWhite = username;
        playerBlack = opponent;
      } else {
        playerWhite = opponent;
        playerBlack = username;
      }
      socket.emit(event, {
        playerWhite,
        playerBlack,
        whosTurn,
        board,
        recentMove,
      });
    } else if (event === 'addPlayerToLobby') {
      const { username, id } = store.getState().lobby;
      socket.emit(event, { usernameInput: username, id });
    } else if (event === 'getLobby') {
      socket.emit(event);
    } else if (event === 'challenge') {
      const { username } = action.payload;
      const challenger = store.getState().lobby.username;
      socket.emit(event, {
        challenger: {
          username: challenger,
          status: ENV.CHALLENGE_STATUS_WAITING,
        },
        challengee: {
          username,
          status: ENV.CHALLENGE_STATUS_RECEIVED,
        },
      });
    } else if (event === 'challengeResponse') {
      const { status } = action.payload;
      const { lobby } = store.getState();
      const challengee = lobby.username;
      const challenger = lobby.opponent;
      socket.emit('challenge', {
        challenger: {
          username: challenger,
          status,
        },
        challengee: {
          username: challengee,
          status,
        },
      });
    } else if (event === 'gameOver') {
      const { playerColor } = store.getState().board;
      const { username, opponent } = store.getState().lobby;
      let playerWhite, playerBlack;
      if (playerColor === 'white') {
        playerWhite = username;
        playerBlack = opponent;
      } else {
        playerWhite = opponent;
        playerBlack = username;
      }
      socket.emit('gameOver', {
        playerWhite,
        playerBlack,
        status: 'TODO: stalemate, draw, checkmate',
      });
    }
  } else if (action.type === 'lobby/closeSocket' && socket.connected) {
    socket.close();
  } else if (action.type === 'lobby/openSocket' && !socket.connected) {
    socket.connect();
  }
  next(action);
};
