import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard, setMouseDown } from '../board/boardSlice';
import { getPieceImage } from './pieceUtil';
import bishopBlack from './images/bishop_black.png';
import bishopWhite from './images/bishop_white.png';
import horseBlack from './images/horse_black.png';
import horseWhite from './images/horse_white.png';
import kingBlack from './images/king_black.png';
import kingWhite from './images/king_white.png';
import pawnWhite from './images/pawn_white.png';
import pawnBlack from './images/pawn_black.png';
import queenBlack from './images/queen_black.png';
import queenWhite from './images/queen_white.png';
import rookBlack from './images/rook_black.png';
import rookWhite from './images/rook_white.png';
import styles from './Piece.module.scss';
import ENV from '../../../env';

const PieceDraggable = (props) => {
  const { windowWidth, windowHeight, posX, posY } = props;
  const dispatch = useDispatch();
  const isMouseDown = useSelector((state) => state.board.isMouseDown);
  const movingPiece = useSelector((state) => state.board.movingPiece);
  // const posX = useSelector((state) => state.board.mouseX);
  // const posY = useSelector((state) => state.board.mouseY);

  if (!isMouseDown || movingPiece === 0) return null;

  const pieceImage = getPieceImage(movingPiece);
  const adjustedX = posX - (windowHeight * 0.1125) / 2;
  const adjustedY = posY - (windowHeight * 0.1125) / 2;
  return (
    <div
      className={styles.pieceDraggable}
      style={{ left: adjustedX, top: adjustedY }}
      onMouseUp={() => dispatch(setMouseDown(false))}
    >
      <img src={pieceImage} alt="" draggable="false" />
    </div>
  );
};

export default PieceDraggable;
