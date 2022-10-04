import { Check, Paid } from "@mui/icons-material";
import React from "react";
import styles from "../styles/Dashboard.module.css";

const PaidChart = ({
  amountPaid,
  level,
  totEarns,
  totalStud,
  percentage,
  debt,
}) => {
  const Circle = () => {
    return (
      <div className={styles.circle}>
        <div className={styles.circle3}>
          <Paid className={styles.circle} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.detCard}>
      <div className={styles.det__info}>
        {<h5>GHS {amountPaid}</h5>}
        <p>Total paid</p>
        <span>Level {level}</span>
      </div>
      <div className={styles.detCard__right}>
        <Circle percentage={80} />
        {debt !== 0 ? (
          <p></p>
        ) : (
          <Check className={styles.checked} />
        )}
      </div>
    </div>
  );
};

export default PaidChart;
