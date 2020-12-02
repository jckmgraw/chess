import React from 'react';
import { useSelector } from 'react-redux';
import { selectBoard } from '../board/boardSlice';
import { getPieceFromBoardPos, getStringFromPiece } from './pieceUtil';
import bishopBlack from './images/bishop_black.png';
import bishopWhite from './images/bishop_white.png';
import horseBlack from './images/horse_black.png';
import horseWhite from './images/horse_white.png';
import kingBlack from './images/king_black.png';
import kingWhite from './images/king_white.png';
import pawnWhite from './images/pawn_white.png';
import pawnBlack from './images/pawn_black.png';
import queenBlack from './images/queen_black.png';
import queenWhite from './images/queen_white.png';
import rookBlack from './images/rook_black.png';
import rookWhite from './images/rook_white.png';
import styles from './Piece.module.scss';
import ENV from '../../../env';

const Piece = (props) => {
  const { boardPos } = props;
  const board = useSelector(selectBoard);
  const piece = getPieceFromBoardPos(board, boardPos);
  if (piece == null) return null;
  let pieceImage;
  if (piece === ENV.WHITE_PAWN) {
    pieceImage = pawnWhite;
  } else if (piece === ENV.BLACK_PAWN) {
    pieceImage = pawnBlack;
  } else if (piece === ENV.WHITE_ROOK) {
    pieceImage = rookWhite;
  } else if (piece === ENV.BLACK_ROOK) {
    pieceImage = rookBlack;
  } else if (piece === ENV.WHITE_KNIGHT) {
    pieceImage = horseWhite;
  } else if (piece === ENV.BLACK_KNIGHT) {
    pieceImage = horseBlack;
  } else if (piece === ENV.WHITE_BISHOP) {
    pieceImage = bishopWhite;
  } else if (piece === ENV.BLACK_BISHOP) {
    pieceImage = bishopBlack;
  } else if (piece === ENV.WHITE_QUEEN) {
    pieceImage = queenWhite;
  } else if (piece === ENV.BLACK_QUEEN) {
    pieceImage = queenBlack;
  } else if (piece === ENV.WHITE_KING) {
    pieceImage = kingWhite;
  } else if (piece === ENV.BLACK_KING) {
    pieceImage = kingBlack;
  }
  return (
    <div className={styles.piece}>
      <img
        src={pieceImage}
        alt=""
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
