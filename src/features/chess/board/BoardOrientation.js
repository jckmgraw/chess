import React from 'react';
import { useSelector } from 'react-redux';
import Piece from '../piece/Piece';
import styles from './Board.module.scss';
import { selectRecentMove, selectMovingPieceStartingPos } from './boardSlice';

const Row = (props) => {
  const { row, boardSize, color } = props;
  const recentMove = useSelector(selectRecentMove);
  const movingPieceStartingPos = useSelector(selectMovingPieceStartingPos);
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
    const boardPos = `${letter}${row}`;
    let isHighlight = false;
    let squareStyle;
    if (recentMove.includes(boardPos) || movingPieceStartingPos === boardPos) {
      isHighlight = true;
    }
    if (isWhiteSquare) {
      if (isHighlight) squareStyle = styles.squareWhiteHighlight;
      else squareStyle = styles.squareWhite;
    } else {
      if (isHighlight) squareStyle = styles.squareBlackHighlight;
      else squareStyle = styles.squareBlack;
    }
    return (
      <div className={squareStyle} key={boardPos}>
        <Piece boardPos={boardPos} />
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
