import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RowVariation1, RowVariation2 } from './Rows';
import {
  setMouseDown,
  selectBoard,
  selectIsMouseDown,
  selectMovingPiece,
  selectMovingPieceStartingPos,
  selectHasWhiteKingMoved,
  selectHasBlackKingMoved,
  selectHasWhiteRookLMoved,
  selectHasWhiteRookRMoved,
  selectHasBlackRookLMoved,
  selectHasBlackRookRMoved,
  selectPlayerColor,
} from './boardSlice';
import {
  useWindowSize,
  useMousePosition,
} from '../../../utilGeneral/utilGeneral';
import styles from './Board.module.scss';
import PieceDraggable from '../piece/PieceDraggable';

// TODO: have board CSS use ENV vars
// TODO: encode piece names
const Board = () => {
  const dispatch = useDispatch();
  const [windowWidth, windowHeight] = useWindowSize();
  const [mouseX, mouseY] = useMousePosition();
  const isMouseDown = useSelector(selectIsMouseDown);
  const movingPiece = useSelector(selectMovingPiece);
  const movingPieceStartingPos = useSelector(selectMovingPieceStartingPos);
  const board = useSelector(selectBoard);
  const hasWhiteKingMoved = useSelector(selectHasWhiteKingMoved);
  const hasBlackKingMoved = useSelector(selectHasBlackKingMoved);
  const hasWhiteRookLMoved = useSelector(selectHasWhiteRookLMoved);
  const hasWhiteRookRMoved = useSelector(selectHasWhiteRookRMoved);
  const hasBlackRookLMoved = useSelector(selectHasBlackRookLMoved);
  const hasBlackRookRMoved = useSelector(selectHasBlackRookRMoved);
  const kingStuff = {
    hasWhiteKingMoved,
    hasBlackKingMoved,
    hasWhiteRookLMoved,
    hasWhiteRookRMoved,
    hasBlackRookLMoved,
    hasBlackRookRMoved,
  };
  const playerColor = useSelector(selectPlayerColor);
  const boardContainerPadding = 20;
  const boardPadding = 20;
  const boardHeight =
    windowHeight - boardPadding * 2 - boardContainerPadding * 2;
  const positionInfo = {
    boardContainerPadding,
    boardPadding,
    boardHeight,
    mouseX,
    mouseY,
  };

  return (
    <div
      className={styles.mainContainer}
      onMouseDown={() => dispatch(setMouseDown(true))}
      onMouseUp={() => dispatch(setMouseDown(false))}
      onMouseLeave={() => dispatch(setMouseDown(false))}
    >
      <div
        className={styles.boardContainer}
        style={{ padding: boardContainerPadding }}
      >
        <div
          className={styles.board}
          style={{
            'min-width': boardHeight,
            'max-width': boardHeight,
            height: boardHeight,
            padding: boardPadding,
          }}
        >
          <PieceDraggable
            board={board}
            isMouseDown={isMouseDown}
            movingPiece={movingPiece}
            movingPieceStartingPos={movingPieceStartingPos}
            kingStuff={kingStuff}
            positionInfo={positionInfo}
          />
          <RowVariation2 row={'8'} boardHeight={boardHeight} />
          <RowVariation1 row={'7'} boardHeight={boardHeight} />
          <RowVariation2 row={'6'} boardHeight={boardHeight} />
          <RowVariation1 row={'5'} boardHeight={boardHeight} />
          <RowVariation2 row={'4'} boardHeight={boardHeight} />
          <RowVariation1 row={'3'} boardHeight={boardHeight} />
          <RowVariation2 row={'2'} boardHeight={boardHeight} />
          <RowVariation1 row={'1'} boardHeight={boardHeight} />
        </div>
      </div>
    </div>
  );
};

export default Board;
