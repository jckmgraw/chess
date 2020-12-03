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

export const getSquareFromMousePos = (data) => {
  const { windowWidth, windowHeight, posX, posY } = data;
  const border = 20; // TODO: move to ENV
  const squareWidth = windowHeight * 0.1125;

  const rowInverted = Math.floor((posY - border) / squareWidth);
  const row = Math.abs(8 - rowInverted);

  const colTemp = Math.floor((posX - border) / squareWidth);
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const col = letters[colTemp];
  return `${col}${row}`;
};
