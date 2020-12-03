import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMouseDown,
  movePiece,
  illegalMove,
  selectBoard,
} from '../board/boardSlice';
import { isMoveLegal } from './pieceUtil';
import { getPieceImage } from './pieceImages';
import { getSquareFromMousePos } from '../../../utilGeneral/utilGeneral';
import styles from './Piece.module.scss';

const PieceDraggable = (props) => {
  const { windowWidth, windowHeight, posX, posY } = props;
  const dispatch = useDispatch();
  const isMouseDown = useSelector((state) => state.board.isMouseDown);
  const movingPiece = useSelector((state) => state.board.movingPiece);
  const movingPieceStartingPos = useSelector(
    (state) => state.board.movingPieceStartingPos
  );
  const board = useSelector(selectBoard);

  if (!isMouseDown || movingPiece === 0) return null;

  const onMouseUp = () => {
    const curSquare = getSquareFromMousePos(props);
    dispatch(setMouseDown(false));
    if (isMoveLegal(board, movingPieceStartingPos, curSquare, movingPiece)) {
      dispatch(movePiece(curSquare));
    } else {
      dispatch(illegalMove());
      console.log('bad move');
    }
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
