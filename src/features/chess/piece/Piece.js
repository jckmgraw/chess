import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMovingPiece,
  setMovingPieceStartingPos,
  selectBoard,
} from '../board/boardSlice';
import { getPieceFromBoardPos } from './pieceUtil';
import { getPieceImage, getStringFromPiece } from './pieceImages';
import styles from './Piece.module.scss';

const Piece = (props) => {
  const { boardPos } = props;
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const movingPiece = useSelector((state) => state.board.movingPiece);
  const movingPieceStartingPos = useSelector(
    (state) => state.board.movingPieceStartingPos
  );
  const piece = getPieceFromBoardPos(board, boardPos);

  if (
    piece === 0 ||
    (movingPiece !== 0 && boardPos === movingPieceStartingPos)
  ) {
    return null;
  }

  const pieceImage = getPieceImage(piece);
  const onMouseDown = () => {
    dispatch(setMovingPiece(piece));
    dispatch(setMovingPieceStartingPos(boardPos));
  };

  return (
    <div className={styles.piece}>
      <img
        src={pieceImage}
        alt=""
        draggable="false"
        onMouseDown={() => onMouseDown()}
        onClick={() =>
          console.log(
            `boardPos: ${boardPos}, piece: ${getStringFromPiece(piece)}`
          )
        }
      />
    </div>
  );
};

export default Piece;
