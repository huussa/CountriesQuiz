"use client";

import styles from "./page.module.css";
import Header from "../components/header";
import CircularProgressBar from "../components/circular-progress-bar";
import ReturnButton from "../components/return-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function EndingScreen() {
  const router = useRouter();
  const {t} = useTranslation();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [highStreak, sethighStreak] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const savedScore = parseInt(sessionStorage.getItem("scoreNow"));
    const savedTotal = parseInt(sessionStorage.getItem("totalNow"));
    const savedhighStreak = parseInt(sessionStorage.getItem("highStreakNow"));
    const savedTime = [sessionStorage.getItem("timeInMinute"), sessionStorage.getItem("timeInSecond")].map((x) => parseInt(x))

    if (savedScore !== null && savedTotal !== null && savedhighStreak !== null && savedTime !== null) {
      setScore(savedScore);
      setTotal(savedTotal);
      sethighStreak(savedhighStreak);
      setTime({minutes: savedTime[0], seconds: savedTime[1]})
    } else {
      router.push("/");
    }
  }, [router]);

  const formattedTime = `${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
// تذكر إضافة الحماية من القسمة على صفر التي ناقشناها سابقاً
  const percentage = total > 0 ? (score / total) * 100 : 0;

  return (
    <>
      <Header score={score} />

      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            {t("endingPage.title")}
          </h2>

          <div className={styles.progressContainer}>
            <CircularProgressBar percentage={percentage} />
            <p className={styles.scoreText}>
              {score} / {total}
            </p>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statIcon}>🔥</span>
              <span className={styles.statValue}>{highStreak}</span>
              <span className={styles.statLabel}>{t("endingPage.highStreak")}</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statIcon}>⏱️</span>
              <span className={styles.statValue}>{formattedTime}</span>
              <span className={styles.statLabel}>{t("endingPage.timeTaken")}</span>
            </div>
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statIcon}>🔥</span>
              <span className={styles.statValue}>{highStreak}</span>
              <span className={styles.statLabel}>{t("endingPage.highStreak")}</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statIcon}>⏱️</span>
              <span className={styles.statValue}>{formattedTime}</span>
              <span className={styles.statLabel}>{t("endingPage.timeTaken")}</span>
            </div>
          </div>

          {/* زر العودة */}
          <div className={styles.actionContainer}>
            <ReturnButton href={"/AllCountiresGame"} />
          </div>
        </div>
      </div>
    </>
  );
}


export default EndingScreen;
