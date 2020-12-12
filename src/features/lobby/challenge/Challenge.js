import React from 'react';
import { useDispatch } from 'react-redux';
import { emitSocketEvent, setChallengeStatus } from '../lobbySlice';
import styles from './Challenge.module.scss';
import ENV from '../../../env';

// TODO: cleanup
const Challenge = (props) => {
  const { challengeStatus, opponent, countdown } = props;
  const dispatch = useDispatch();
  let display;
  if (challengeStatus === ENV.CHALLENGE_STATUS_WAITING) {
    display = (
      <div>
        <div className={styles.titleText}>Challenge sent</div>
        <div className={styles.smallText}>
          {opponent} has {countdown} seconds to respond
        </div>
        <div className={styles.buttonRow}>
          <div
            className={styles.button}
            onClick={() => {
              dispatch(setChallengeStatus(ENV.CHALLENGE_STATUS_IDLE));
            }}
          >
            Close
          </div>
        </div>
      </div>
    );
  } else if (challengeStatus === ENV.CHALLENGE_STATUS_RECEIVED) {
    display = (
      <div>
        <div className={styles.titleText}>Game Invite</div>
        <div className={styles.smallText}>
          {opponent} has challenged you. Closing in {countdown} seconds...
        </div>
        <div className={styles.buttonRow}>
          <div
            className={styles.button}
            onClick={() => {
              dispatch(setChallengeStatus(ENV.CHALLENGE_STATUS_ACCEPTED));
              dispatch(
                emitSocketEvent({
                  event: 'challengeResponse',
                  status: ENV.CHALLENGE_STATUS_ACCEPTED,
                })
              );
            }}
          >
            Accept
          </div>
          <div className={styles.spaceBetweenButtons}></div>
          <div
            className={styles.button}
            onClick={() => {
              dispatch(setChallengeStatus(ENV.CHALLENGE_STATUS_IDLE));
              dispatch(
                emitSocketEvent({
                  event: 'challengeResponse',
                  status: ENV.CHALLENGE_STATUS_REJECTED,
                })
              );
            }}
          >
            Reject
          </div>
        </div>
      </div>
    );
  } else if (challengeStatus === ENV.CHALLENGE_STATUS_REJECTED) {
    display = (
      <div>
        <div className={styles.titleText}>Your challenge was rejected</div>
        <div className={styles.smallText}>:(</div>
        <div className={styles.buttonRow}>
          <div
            className={styles.button}
            onClick={() => {
              dispatch(setChallengeStatus(ENV.CHALLENGE_STATUS_IDLE));
            }}
          >
            Close
          </div>
        </div>
      </div>
    );
  } else if (challengeStatus === ENV.CHALLENGE_STATUS_ACCEPTED) {
    display = <div>challenge status accepted</div>;
  }
  return <div className={styles.popupBox}>{display}</div>;
};

export default Challenge;
