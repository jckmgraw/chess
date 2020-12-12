import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openSocket, closeSocket } from '../lobby/lobbySlice';
import Lobby from '../lobby/Lobby';

const SocketWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openSocket());
    return () => {
      dispatch(closeSocket());
    };
  });
  return <Lobby />;
};

export default SocketWrapper;
