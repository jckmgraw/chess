import React from 'react';
import Piece from '../piece/Piece';
import styles from './Board.module.scss';

export const BoardOrientation = (props) => {
  const { boardHeight, playerColor } = props;
  if (playerColor === 'white') {
    return (
      <div>
        <Row row={'8'} height={boardHeight} color={playerColor} />
        <Row row={'7'} height={boardHeight} color={playerColor} />
        <Row row={'6'} height={boardHeight} color={playerColor} />
        <Row row={'5'} height={boardHeight} color={playerColor} />
        <Row row={'4'} height={boardHeight} color={playerColor} />
        <Row row={'3'} height={boardHeight} color={playerColor} />
        <Row row={'2'} height={boardHeight} color={playerColor} />
        <Row row={'1'} height={boardHeight} color={playerColor} />
      </div>
    );
  } else {
    return (
      <div>
        <Row row={'1'} height={boardHeight} color={playerColor} />
        <Row row={'2'} height={boardHeight} color={playerColor} />
        <Row row={'3'} height={boardHeight} color={playerColor} />
        <Row row={'4'} height={boardHeight} color={playerColor} />
        <Row row={'5'} height={boardHeight} color={playerColor} />
        <Row row={'6'} height={boardHeight} color={playerColor} />
        <Row row={'7'} height={boardHeight} color={playerColor} />
        <Row row={'8'} height={boardHeight} color={playerColor} />
      </div>
    );
  }
};

export const Row = (props) => {
  const { row, height, color } = props;
  const rowHeight = height / 8;
  let letters, isWhiteSquare;
  if (color === 'white') {
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    if (row % 2 === 0) {
      isWhiteSquare = true;
    }
  } else if (color === 'black') {
    letters = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
    if (row % 2 === 1) {
      isWhiteSquare = true;
    }
  } else {
    return null;
  }

  const rows = letters.map((letter) => {
    isWhiteSquare = !isWhiteSquare;
    return (
      <div
        className={isWhiteSquare ? styles.squareBlack : styles.squareWhite}
        key={`${letter}${row}`}
      >
        <Piece boardPos={`${letter}${row}`} />
      </div>
    );
  });
  return (
    <div className={styles.row} style={{ height: rowHeight }}>
      {rows}
    </div>
  );
};
