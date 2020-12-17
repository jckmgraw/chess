import React from 'react';
import { useDispatch } from 'react-redux';
import { setMouseDown, movePiece, illegalMove } from '../board/boardSlice';
import { emitSocketEvent } from '../../lobby/lobbySlice';
import { isMoveLegal, getColorFromBoardPos } from './pieceUtil';
import { getPieceImage } from './pieceImages';
import {
  getSquareFromMousePos,
  getAdjustedCoords,
  getPieceSize,
} from '../../../utilGeneral/positionUtil';
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
    whosTurn,
  } = props;
  const dispatch = useDispatch();
  if (!isMouseDown || movingPiece === 0) return null;

  const pieceImage = getPieceImage(movingPiece);
  const pieceSize = getPieceSize(positionInfo);
  const [adjustedX, adjustedY] = getAdjustedCoords(positionInfo);

  const onMouseUp = () => {
    const curSquare = getSquareFromMousePos({ positionInfo, playerColor });
    const pieceColor = getColorFromBoardPos(board, movingPieceStartingPos);
    console.log(`pieceColor: ${pieceColor}`);
    if (
      curSquare == null ||
      whosTurn !== playerColor ||
      pieceColor !== playerColor
    ) {
      dispatch(illegalMove());
    } else {
      const { isLegal, isCastling, isPawnUpgrade } = isMoveLegal({
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
            isPawnUpgrade,
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
      style={{
        width: pieceSize,
        height: pieceSize,
        left: adjustedX,
        top: adjustedY,
      }}
      onMouseUp={() => onMouseUp()}
    >
      <img src={pieceImage} alt="" draggable="false" />
    </div>
  );
};

export default PieceDraggable;
