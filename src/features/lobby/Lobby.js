import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAddPlayerStatus,
  selectChallengeStatus,
  selectPrevChallengeStatus,
  selectGameStatus,
  selectOpponent,
  selectPlayers,
  selectCountdown,
} from './lobbySlice';
import { CircularProgress } from '@material-ui/core';
import UsernameForm from './UsernameForm';
import Players from './Players';
import Challenge from './challenge/Challenge';
import Board from '../chess/board/Board';
import ENV from '../../env';
import styles from './Lobby.module.scss';

const Lobby = () => {
  const addPlayerStatus = useSelector(selectAddPlayerStatus);
  const gameStatus = useSelector(selectGameStatus);
  const challengeStatus = useSelector(selectChallengeStatus);
  const prevChallengeStatus = useSelector(selectPrevChallengeStatus);
  const players = useSelector(selectPlayers);
  const opponent = useSelector(selectOpponent);
  const countdown = useSelector(selectCountdown);
  let display;
  if (gameStatus === ENV.GAME_STATUS_LOBBY) {
    if (addPlayerStatus === ENV.ADD_PLAYER_STATUS_EDITING) {
      display = <UsernameForm />;
    } else if (addPlayerStatus === ENV.ADD_PLAYER_STATUS_WAITING) {
      display = <CircularProgress color="inherit" />;
    } else if (addPlayerStatus === ENV.ADD_PLAYER_STATUS_RECEIVED) {
      if (challengeStatus === ENV.CHALLENGE_STATUS_IDLE) {
        display = <Players players={players} />;
      } else {
        display = (
          <Challenge
            challengeStatus={challengeStatus}
            prevChallengeStatus={prevChallengeStatus}
            opponent={opponent}
            countdown={countdown}
          />
        );
      }
    }
  } else if (gameStatus === ENV.GAME_STATUS_GO) {
    display = <Board />;
  }
  return <div className={styles.lobbyContainer}>{display}</div>;
};

export default Lobby;
