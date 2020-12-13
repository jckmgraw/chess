import React from 'react';
import { useSelector } from 'react-redux';
import { selectCountdown, selectOpponent } from '../lobbySlice';
import styles from './Challenge.module.scss';

// TODO: sync countdown with dateTime
const GameCountdown = () => {
  const countdown = useSelector(selectCountdown);
  const opponent = useSelector(selectOpponent);
  return (
    <div className={styles.popupBox}>
      <div className={styles.titleText}>A countdown</div>
      <div className={styles.smallText}>
        Don't let {opponent} slap you in {countdown} seconds...
      </div>
    </div>
  );
};

export default GameCountdown;
