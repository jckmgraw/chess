import { createSlice } from '@reduxjs/toolkit';
import randomstring from 'randomstring';
import ENV from '../../env';

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState: {
    username: '',
    opponent: '',
    // shouldn't need 'id' now => fix should be server-side
    id: randomstring.generate(),
    players: [],
    addPlayerStatus: ENV.ADD_PLAYER_STATUS_EDITING,
    isUsernameTaken: false,
    gameStatus: ENV.GAME_STATUS_LOBBY,
    challengeStatus: ENV.CHALLENGE_STATUS_IDLE,
    countdown: 0,
    connStatus: ENV.CONN_STATUS_NO_CONNECTION,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setOpponent: (state, action) => {
      state.opponent = action.payload;
    },
    addPlayerToLobby: (state) => {
      state.players.push(state.username);
    },
    setAddPlayerStatus: (state, action) => {
      state.addPlayerStatus = action.payload;
    },
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    setPlayersInLobby: (state, action) => {
      state.players = action.payload;
    },
    handleUsernameAlreadyTaken: (state) => {
      state.isUsernameTaken = true;
      state.addPlayerStatus = ENV.ADD_PLAYER_STATUS_EDITING;
      state.username = '';
    },
    resetIsUsernameTaken: (state) => {
      state.usernameTaken = false;
    },
    setChallengeStatus: (state, action) => {
      state.challengeStatus = action.payload;
    },
    resetChallengeStatus: (state) => {
      if (
        state.challengeStatus === ENV.CHALLENGE_STATUS_WAITING ||
        state.challengeStatus === ENV.CHALLENGE_STATUS_RECEIVED
      ) {
        state.challengeStatus = ENV.CHALLENGE_STATUS_IDLE;
      }
    },
    decrementCountdown: (state, action) => {
      state.countdown -= 1;
    },
    setCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    openSocket: (state) => {
      // handled in socket middleware
    },
    closeSocket: (state) => {
      // handled in socket middleware
    },
    emitSocketEvent: (state) => {
      // handled in socket middleware
    },
    setConnStatus: (state, action) => {
      state.connStatus = action.payload;
    },
  },
});

export const {
  setUsername,
  setOpponent,
  addPlayerToLobby,
  setAddPlayerStatus,
  setGameStatus,
  setPlayersInLobby,
  handleUsernameAlreadyTaken,
  resetIsUsernameTaken,
  setChallengeStatus,
  resetChallengeStatus,
  decrementCountdown,
  setCountdown,

  openSocket,
  closeSocket,
  emitSocketEvent,
  setConnStatus,
} = lobbySlice.actions;

export const setChallengeStatusAsync = (payload) => (dispatch) => {
  const { time, status } = payload;
  dispatch(setChallengeStatus(status));
  dispatch(setCountdown(time / 1000));
  const interval = setInterval(() => {
    dispatch(decrementCountdown());
  }, 1000);
  setTimeout(() => {
    dispatch(resetChallengeStatus());
    clearInterval(interval);
  }, time);
};

export const selectUsername = (state) => state.lobby.username;
export const selectOpponent = (state) => state.lobby.opponent;
export const selectIsUsernameTaken = (state) => state.lobby.isUsernameTaken;
export const selectPlayers = (state) => state.lobby.players;
export const selectAddPlayerStatus = (state) => state.lobby.addPlayerStatus;
export const selectGameStatus = (state) => state.lobby.gameStatus;
export const selectChallengeStatus = (state) => state.lobby.challengeStatus;
export const selectPrevChallengeStatus = (state) =>
  state.lobby.prevChallengeStatus;
export const selectCountdown = (state) => state.lobby.countdown;

export default lobbySlice.reducer;
