"use client";
import styles from "../page.module.css";

function CircularProgressBar({ percentage }) {
  return (
    <div className={styles.progressWrapper} style={{ '--progress': `${percentage}%` }}>
      <div className={styles.progressInnerCircle}>{percentage.toFixed(2)}%</div>
    </div>
  );
}
export default CircularProgressBar;
