import { dir } from "i18next";
import styles from "../page.module.css";
import { useTranslation } from "react-i18next";

function ProgressBar({ currentIndex, totalQuestions, streak, streakword }) {
  const {t, i18n} = useTranslation()
  const dir = i18n.language
  const progressPercentage = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  return (
    <>
      <div className={styles.progressBar}>
        <div className={streak < 3 ? styles.progressFill : styles.streakProgressFill} style={{ width: `${progressPercentage}%` }}></div>
        <div className={styles.progressText} dir={dir === "ar" ? "rtl" : "ltr"}>{streak < 3 ? `${currentIndex + 1} / ${totalQuestions}` : `${currentIndex + 1} / ${totalQuestions} ${t("gamePage.streak")}${streak}🔥`}</div>
      </div>
    </>
  )
}
export default ProgressBar;