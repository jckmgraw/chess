import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOpponent,
  setChallengeStatus,
  selectOpponent,
  selectGameStatus,
  setGameStatus,
  emitSocketEvent,
} from '../lobbySlice';
import ENV from '../../../env';
import styles from './Challenge.module.scss';

const GameOver = () => {
  const dispatch = useDispatch();
  const opponent = useSelector(selectOpponent);
  const gameStatus = useSelector(selectGameStatus);
  let title, message;
  if (gameStatus === ENV.GAME_STATUS_WIN) {
    title = 'Winner, winner';
    message = `Congrats on beating ${opponent}. Want a cookie?`;
  } else if (gameStatus === ENV.GAME_STATUS_LOSS) {
    title = 'Checkmate mother fucker!';
    message = `${opponent} just smoked you`;
  } else {
    title = 'Oops';
    message = 'Something went wrong... Looks like I wrote some bad code';
  }
  return (
    <div className={styles.popupBox}>
      <div className={styles.titleText}>{title}</div>
      <div className={styles.smallText}>{message}</div>
      <div className={styles.buttonRow}>
        <div
          className={styles.button}
          onClick={() => {
            dispatch(emitSocketEvent({ event: 'getLobby' }));
            dispatch(setGameStatus(ENV.GAME_STATUS_LOBBY));
            dispatch(setChallengeStatus(ENV.CHALLENGE_STATUS_IDLE));
            dispatch(setOpponent(''));
          }}
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default GameOver;
