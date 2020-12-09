import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openSocket, closeSocket } from '../chess/board/boardSlice';
import Board from '../chess/board/Board';

const SocketWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('dispatch openSocket()');
    dispatch(openSocket());
    return () => {
      dispatch(closeSocket());
    };
  });
  return <Board />;
};

export default SocketWrapper;
