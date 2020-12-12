import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsername,
  setAddPlayerStatus,
  selectUsername,
  resetIsUsernameTaken,
  selectIsUsernameTaken,
  emitSocketEvent,
} from './lobbySlice';
import { TextField, Button } from '@material-ui/core';
import ENV from '../../env';
import styles from './Lobby.module.scss';

const UsernameForm = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const isUsernameTaken = useSelector(selectIsUsernameTaken);
  let usernameTakenDisplay = null;
  if (isUsernameTaken) {
    usernameTakenDisplay = (
      <div className={styles.smallText}>
        That username has already been taken
      </div>
    );
  }
  return (
    <div className={styles.usernameForm}>
      <div className={styles.welcomeText}>Chess by Jack McGraw</div>
      <div className={styles.smallText}>
        Alternatively, feel free to{' '}
        <a href="https://www.chess.com/member/jckmcgraw">add me</a> on chess.com
      </div>
      <form
        className={styles.formRow}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setAddPlayerStatus(ENV.ADD_PLAYER_STATUS_WAITING));
          dispatch(resetIsUsernameTaken());
          dispatch(emitSocketEvent({ event: 'addPlayerToLobby' }));
        }}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          fullWidth={true}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <Button
          type="submit"
          variant="outlined"
          size="large"
          disabled={username.length === 0 ? true : false}
          // fullWidth={true}
        >
          Play
        </Button>
      </form>
      {usernameTakenDisplay}
    </div>
  );
};

export default UsernameForm;
