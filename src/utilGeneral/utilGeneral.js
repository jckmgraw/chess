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

export const getSquareFromMousePos = (positionInfo) => {
  const {
    boardContainerPadding,
    boardPadding,
    boardHeight,
    mouseX,
    mouseY,
  } = positionInfo;
  const squareWidth = boardHeight / 8;
  const border = boardContainerPadding + boardPadding;

  const rowInverted = Math.floor((mouseY - border) / squareWidth);
  const row = Math.abs(8 - rowInverted);

  const colTemp = Math.floor((mouseX - border) / squareWidth);
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const col = letters[colTemp];
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
