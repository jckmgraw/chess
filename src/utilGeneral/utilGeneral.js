import { useEffect, useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export const useMousePosition = () => {
  const [mousePos, setMousePos] = useState([null, null]);
  const updateMousePos = (e) => {
    setMousePos([e.clientX, e.clientY]);
  };
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);
  return mousePos;
};

export const getSquareFromMousePos = ({ positionInfo, playerColor }) => {
  const {
    boardContainerPadding,
    boardPadding,
    boardHeight,
    mouseX,
    mouseY,
  } = positionInfo;
  const squareWidth = boardHeight / 8;
  const border = boardContainerPadding + boardPadding;

  let row, col, letters;
  const colTemp = Math.floor((mouseX - border) / squareWidth);
  const rowInverted = Math.floor((mouseY - border) / squareWidth);
  if (playerColor === 'white') {
    row = Math.abs(8 - rowInverted);
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  } else {
    row = rowInverted + 1;
    letters = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
  }
  col = letters[colTemp];
  if (col == null || row == null) return null;
  return `${col}${row}`;
};

export const getAdjustedCoords = (positionInfo) => {
  const { boardHeight, mouseX, mouseY } = positionInfo;
  const pieceSize = boardHeight / 8;
  const adjustedX = mouseX - pieceSize / 2;
  const adjustedY = mouseY - pieceSize / 2;
  return [adjustedX, adjustedY];
};
