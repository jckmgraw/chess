import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMouseDown, movePiece } from '../board/boardSlice';
import { getPieceImage } from './pieceUtil';
import { getSquareFromMousePos } from '../../../utilGeneral/utilGeneral';
import styles from './Piece.module.scss';

const PieceDraggable = (props) => {
  const { windowWidth, windowHeight, posX, posY } = props;
  const dispatch = useDispatch();
  const isMouseDown = useSelector((state) => state.board.isMouseDown);
  const movingPiece = useSelector((state) => state.board.movingPiece);

  if (!isMouseDown || movingPiece === 0) return null;

  const onMouseUp = () => {
    const curSquare = getSquareFromMousePos(props);
    dispatch(setMouseDown(false));
    dispatch(movePiece(curSquare));
  };

  const pieceImage = getPieceImage(movingPiece);
  const adjustedX = posX - (windowHeight * 0.1125) / 2;
  const adjustedY = posY - (windowHeight * 0.1125) / 2;
  return (
    <div
      className={styles.pieceDraggable}
      style={{ left: adjustedX, top: adjustedY }}
      onMouseUp={() => onMouseUp()}
    >
      <img src={pieceImage} alt="" draggable="false" />
    </div>
  );
};

export default PieceDraggable;
