import React from 'react';
import Piece from '../piece/Piece';
import styles from './Board.module.scss';

export const RowVariation1 = (props) => {
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

export const RowVariation2 = (props) => {
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
