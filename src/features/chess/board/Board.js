import React from 'react';
import Piece from '../piece/Piece';
import { useDispatch } from 'react-redux';
import { resetBoard } from './boardSlice';
import styles from './Board.module.scss';

const RowVariation1 = (props) => {
  const { row } = props;
  return (
    <div className={styles.row}>
      <div className={styles.squareBlack}>
        <Piece boardPos={`a${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`b${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`c${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`d${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`e${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`f${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`g${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`h${row}`} />
      </div>
    </div>
  );
};

const RowVariation2 = (props) => {
  const { row } = props;
  return (
    <div className={styles.row}>
      <div className={styles.squareWhite}>
        <Piece boardPos={`a${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`b${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`c${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`d${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`e${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`f${row}`} />
      </div>
      <div className={styles.squareWhite}>
        <Piece boardPos={`g${row}`} />
      </div>
      <div className={styles.squareBlack}>
        <Piece boardPos={`h${row}`} />
      </div>
    </div>
  );
};

const Board = () => {
  const dispatch = useDispatch();
  dispatch(resetBoard());
  return (
    <div className={styles.board}>
      <RowVariation2 row={'8'} />
      <RowVariation1 row={'7'} />
      <RowVariation2 row={'6'} />
      <RowVariation1 row={'5'} />
      <RowVariation2 row={'4'} />
      <RowVariation1 row={'3'} />
      <RowVariation2 row={'2'} />
      <RowVariation1 row={'1'} />
    </div>
  );
};

export default Board;
