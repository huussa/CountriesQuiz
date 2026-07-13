import { dir } from "i18next";
import styles from "../page.module.css";

function ProgressBar({ currentIndex, totalQuestions, streak }) {
  const progressPercentage = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  return (
      <div className={styles.progressBar}>
        <div className={streak < 3 ? styles.progressFill : styles.streakProgressFill} style={{ width: `${progressPercentage}%` }}></div>
        <div className={styles.progressText}>{`${currentIndex + 1} / ${totalQuestions}`}</div>
      </div>
  )
}
export default ProgressBar;