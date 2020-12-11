import React from 'react';
import Piece from '../piece/Piece';
import styles from './Board.module.scss';

const Row = (props) => {
  const { row, boardSize, color } = props;
  const rowHeight = boardSize / 8;
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

const BoardOrientation = (props) => {
  const { boardSize, playerColor } = props;
  if (playerColor === 'white') {
    return (
      <div>
        <Row row={'8'} boardSize={boardSize} color={playerColor} />
        <Row row={'7'} boardSize={boardSize} color={playerColor} />
        <Row row={'6'} boardSize={boardSize} color={playerColor} />
        <Row row={'5'} boardSize={boardSize} color={playerColor} />
        <Row row={'4'} boardSize={boardSize} color={playerColor} />
        <Row row={'3'} boardSize={boardSize} color={playerColor} />
        <Row row={'2'} boardSize={boardSize} color={playerColor} />
        <Row row={'1'} boardSize={boardSize} color={playerColor} />
      </div>
    );
  } else {
    return (
      <div>
        <Row row={'1'} boardSize={boardSize} color={playerColor} />
        <Row row={'2'} boardSize={boardSize} color={playerColor} />
        <Row row={'3'} boardSize={boardSize} color={playerColor} />
        <Row row={'4'} boardSize={boardSize} color={playerColor} />
        <Row row={'5'} boardSize={boardSize} color={playerColor} />
        <Row row={'6'} boardSize={boardSize} color={playerColor} />
        <Row row={'7'} boardSize={boardSize} color={playerColor} />
        <Row row={'8'} boardSize={boardSize} color={playerColor} />
      </div>
    );
  }
};

export default BoardOrientation;
