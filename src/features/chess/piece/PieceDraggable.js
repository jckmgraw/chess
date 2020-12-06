import React from 'react';
import { useDispatch } from 'react-redux';
import { setMouseDown, movePiece, illegalMove } from '../board/boardSlice';
import { isMoveLegal } from './pieceUtil';
import { kingMove } from './moveLogic/kingLogic';
import { getPieceImage } from './pieceImages';
import { getSquareFromMousePos } from '../../../utilGeneral/utilGeneral';
import ENV from '../../../env';
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
    } else if (Math.abs(movingPiece) === ENV.WHITE_KING) {
      const { isMoveLegal, isCastling } = kingMove({
        board,
        startPos: movingPieceStartingPos,
        endPos: curSquare,
        piece: movingPiece,
        kingStuff,
      });
      if (isMoveLegal) {
        dispatch(
          movePiece({
            endPos: curSquare,
            piece: movingPiece,
            startPos: movingPieceStartingPos,
            isCastling,
          })
        );
      } else {
        dispatch(illegalMove());
      }
    } else if (
      isMoveLegal(board, movingPieceStartingPos, curSquare, movingPiece)
    ) {
      dispatch(
        movePiece({
          endPos: curSquare,
          piece: movingPiece,
          startPos: movingPieceStartingPos,
          isCastling: false,
        })
      );
    } else {
      dispatch(illegalMove());
    }
    dispatch(setMouseDown(false));
  };

  const pieceImage = getPieceImage(movingPiece);
  // TODO
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
