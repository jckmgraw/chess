import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movePiece, setMouseHoverSquare } from '../board/boardSlice';
import Piece from '../piece/Piece';
import styles from './Board.module.scss';

// TODO: clean up this mess
export const RowVariation1 = (props) => {
  const { row } = props;
  const dispatch = useDispatch();
  const movingPiece = useSelector((state) => state.board.movingPiece);
  const handleMouseOver = (square) => {
    dispatch(setMouseHoverSquare(square));
    if (movingPiece !== 0) {
      dispatch(movePiece());
    }
  };
  return (
    <div className={styles.row}>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`a${row}`)}
      >
        <Piece boardPos={`a${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`b${row}`)}
      >
        <Piece boardPos={`b${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`c${row}`)}
      >
        <Piece boardPos={`c${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`d${row}`)}
      >
        <Piece boardPos={`d${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`e${row}`)}
      >
        <Piece boardPos={`e${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`f${row}`)}
      >
        <Piece boardPos={`f${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`g${row}`)}
      >
        <Piece boardPos={`g${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`h${row}`)}
      >
        <Piece boardPos={`h${row}`} />
      </div>
    </div>
  );
};

export const RowVariation2 = (props) => {
  const { row } = props;
  const dispatch = useDispatch();
  const movingPiece = useSelector((state) => state.board.movingPiece);
  const handleMouseOver = (square) => {
    dispatch(setMouseHoverSquare(square));
    if (movingPiece !== 0) {
      dispatch(movePiece());
    }
  };
  return (
    <div className={styles.row}>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`a${row}`)}
      >
        <Piece boardPos={`a${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`b${row}`)}
      >
        <Piece boardPos={`b${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`c${row}`)}
      >
        <Piece boardPos={`c${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`d${row}`)}
      >
        <Piece boardPos={`d${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`e${row}`)}
      >
        <Piece boardPos={`e${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`f${row}`)}
      >
        <Piece boardPos={`f${row}`} />
      </div>
      <div
        className={styles.squareWhite}
        onMouseOver={() => handleMouseOver(`g${row}`)}
      >
        <Piece boardPos={`g${row}`} />
      </div>
      <div
        className={styles.squareBlack}
        onMouseOver={() => handleMouseOver(`h${row}`)}
      >
        <Piece boardPos={`h${row}`} />
      </div>
    </div>
  );
};
