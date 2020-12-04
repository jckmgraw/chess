import React from 'react';
import { useDispatch } from 'react-redux';
import { setMouseDown, movePiece, illegalMove } from '../board/boardSlice';
import { isMoveLegal } from './pieceUtil';
import { getPieceImage } from './pieceImages';
import { getSquareFromMousePos } from '../../../utilGeneral/utilGeneral';
import styles from './Piece.module.scss';

const PieceDraggable = (props) => {
  const {
    windowHeight,
    posX,
    posY,
    board,
    movingPieceStartingPos,
    movingPiece,
    isMouseDown,
  } = props;
  const dispatch = useDispatch();
  if (!isMouseDown || movingPiece === 0) return null;

  const onMouseUp = () => {
    const curSquare = getSquareFromMousePos(props);
    if (curSquare == null) {
      dispatch(illegalMove());
    } else if (
      isMoveLegal(board, movingPieceStartingPos, curSquare, movingPiece)
    ) {
      dispatch(movePiece(curSquare));
    } else {
      dispatch(illegalMove());
      console.log('bad move');
    }
    dispatch(setMouseDown(false));
  };

  const pieceImage = getPieceImage(movingPiece);
  const adjustedX = Math.min(
    posX - (windowHeight * 0.1125) / 2,
    windowHeight * 0.9
  );
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
