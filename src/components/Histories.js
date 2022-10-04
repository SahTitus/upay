import React from "react";
import styles from "../styles/Histories.module.css";

const Histories = ({ failed, level, timestamp, status, amount }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className={styles.histories}>
      <div className={styles.listItem}>
        <div className={styles.image}>
          <img src={user?.result?.image} alt="oh" />
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            Payment <span> Level {level}</span>
          </p>
          {!failed ? (
            <span>Sorry, your payment verification failed, try again</span>
          ) : (
            <span>You have successfully paid an amount of GHS{amount}</span>
          )}
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <div className={styles.status}>
          <strong>GHS {amount}</strong>
          {failed ? (
            <span className={styles.success}>SUCCESS</span>
          ) : (
            <span className={styles.failed}>FAILED</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Histories;
