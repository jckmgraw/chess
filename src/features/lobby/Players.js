import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from '../../utilGeneral/declarativeTimers';
import {
  setOpponent,
  emitSocketEvent,
  selectUsername,
  setChallengeStatusAsync,
} from './lobbySlice';
import ENV from '../../env';
import styles from './Lobby.module.scss';

const Player = (props) => {
  const { username, isSelf, setPlayersText } = props;
  const dispatch = useDispatch();
  const onChallenge = () => {
    console.log(`challenge ${username}`);
    if (isSelf) {
      // eslint-disable-next-line quotes
      setPlayersText("Ha, you can't play yourself");
    } else {
      dispatch(
        setChallengeStatusAsync({
          time: 5000,
          status: ENV.CHALLENGE_STATUS_WAITING,
        })
      );
      dispatch(setOpponent(username));
      dispatch(emitSocketEvent({ event: 'challenge', username }));
    }
  };
  return (
    <div style={{ paddingBottom: 10 }}>
      <div className={styles.playerContainer} onClick={() => onChallenge()}>
        <div className={styles.player}>{username}</div>
      </div>
    </div>
  );
};

// TODO: Title message timed queue to improve comedic timing
//       of punch lines.
//       This is proving a bit more fun than I thought...
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const Players = (props) => {
  const { players } = props;
  const username = useSelector(selectUsername);
  const [playersText, setPlayersText] = useState('List of Players');

  useInterval(() => {
    let text;
    if (players.length === 1) {
      text = 'Do you not have any friends to invite?';
    } else {
      text = 'Go ahead and challenge somebody';
    }
    setPlayersText(text);
  }, 5000);

  const playerList = players.map((player) => {
    if (player === username) return null;
    return <Player key={player} username={player} isSelf={false} />;
  });
  return (
    <div className={styles.playersContainer}>
      <div className={styles.welcomeText} style={{ paddingTop: 20 }}>
        {playersText}
      </div>
      <div className={styles.playersList}>
        <Player
          username={username}
          isSelf={true}
          setPlayersText={setPlayersText}
        />
        {playerList}
      </div>
    </div>
  );
};

export default Players;
