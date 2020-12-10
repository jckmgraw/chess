import { createSlice } from '@reduxjs/toolkit';

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState: {
    players: [],
    addPlayerStatus: '',
  },
  reducers: {
    addPlayerToLobby: (state, action) => {
      state.players = action.payload;
    },
    addPlayerStatus: (state, action) => {
      state.addPlayerStatus = action.payload;
    },
  },
});

export const { addPlayerToLobby } = lobbySlice.actions;

export const selectPlayers = (state) => state.lobby.players;
