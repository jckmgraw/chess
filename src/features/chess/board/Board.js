import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardOrientation from './BoardOrientation';
import {
  illegalMove,
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
  selectWhosTurn,
} from './boardSlice';
import {
  useWindowSize,
  useMousePosition,
  isMouseOutsideOfBoard,
} from '../../../utilGeneral/positionUtil';
import styles from './Board.module.scss';
import PieceDraggable from '../piece/PieceDraggable';
import { getBoardSizing } from './initBoard';

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
  const whosTurn = useSelector(selectWhosTurn);
  const {
    boardContainerPadding,
    boardSize,
    boardPadding,
    positionInfo,
  } = getBoardSizing({ windowWidth, windowHeight, mouseX, mouseY });

  // TODO: Causing warning: 'Cannot update a component ('Piece') while
  //       rendering a different component ('Board') - only triggers
  //       first time piece is dragged offscreen
  //       See: https://github.com/facebook/react/issues/18178
  if (isMouseDown && movingPiece !== 0 && isMouseOutsideOfBoard(positionInfo)) {
    dispatch(setMouseDown(false));
    dispatch(illegalMove());
  }
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
            width: boardSize,
            height: boardSize,
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
            playerColor={playerColor}
            whosTurn={whosTurn}
          />
          <BoardOrientation boardSize={boardSize} playerColor={playerColor} />
        </div>
      </div>
    </div>
  );
};

export default Board;
