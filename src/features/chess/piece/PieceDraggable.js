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
    kingStuff,
  } = props;
  const dispatch = useDispatch();
  if (!isMouseDown || movingPiece === 0) return null;

  const onMouseUp = () => {
    const curSquare = getSquareFromMousePos(props);
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
      } else {
        dispatch(illegalMove());
      }
    }
    dispatch(setMouseDown(false));
  };

  const pieceImage = getPieceImage(movingPiece);
  // TODO: no hardcoding
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
