import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setMouseDown,
  movePiece,
  illegalMove,
  emitSocketEvent,
} from '../board/boardSlice';
import { isMoveLegal } from './pieceUtil';
import { getPieceImage } from './pieceImages';
import {
  getSquareFromMousePos,
  getAdjustedCoords,
} from '../../../utilGeneral/utilGeneral';
import styles from './Piece.module.scss';

const PieceDraggable = (props) => {
  const {
    board,
    movingPieceStartingPos,
    movingPiece,
    isMouseDown,
    kingStuff,
    positionInfo,
    playerColor,
  } = props;
  const dispatch = useDispatch();
  if (!isMouseDown || movingPiece === 0) return null;

  const pieceImage = getPieceImage(movingPiece);
  const [adjustedX, adjustedY] = getAdjustedCoords(positionInfo);

  const onMouseUp = () => {
    const curSquare = getSquareFromMousePos({ positionInfo, playerColor });
    console.log(`curSquare: ${curSquare}`);
    if (curSquare == null) {
      dispatch(illegalMove());
    } else {
      const { isLegal, isCastling } = isMoveLegal({
        board,
        startPos: movingPieceStartingPos,
        endPos: curSquare,
        piece: movingPiece,
        kingStuff,
      });
      if (isLegal) {
        dispatch(
          movePiece({
            endPos: curSquare,
            piece: movingPiece,
            startPos: movingPieceStartingPos,
            isCastling: isCastling || false,
          })
        );
        dispatch(emitSocketEvent({ event: 'processMove' }));
      } else {
        dispatch(illegalMove());
      }
    }
    dispatch(setMouseDown(false));
  };

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
