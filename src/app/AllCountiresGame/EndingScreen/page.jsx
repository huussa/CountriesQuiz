"use client";

import styles from "./page.module.css";
import Header from "../components/header";
import CircularProgressBar from "../components/circular-progress-bar";
import ReturnButton from "../components/return-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "react-use";
import confetti from "canvas-confetti";

function EndingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { width, height } = useWindowSize();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [highStreak, sethighStreak] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [highestStreak, setHighestStreak] = useState(0);
  const [bestTime, setBestTime] = useState({ minutes: 0, seconds: 0 });
  const [isNewStreakRecord, setIsNewStreakRecord] = useState(false);
  const [isNewBestTime, setIsNewBestTime] = useState(false);
  const [isNewBestScore, setIsNewBestScore] = useState(false);

  useEffect(() => {
    // 1. Get the current values from the finished game
    const rawScore = sessionStorage.getItem("scoreNow");
    const rawTotal = sessionStorage.getItem("totalNow");
    const rawHighStreak = sessionStorage.getItem("highStreakNow");
    const rawMin = sessionStorage.getItem("timeInMinute");
    const rawSec = sessionStorage.getItem("timeInSecond");

    // Check if the data exists, if not redirect to home
    if (!rawScore && !rawTotal && !rawHighStreak && !rawMin && !rawSec) {
      router.push("/");
      return;
    }

    // Convert current data to numbers and store them in local variables
    const currentScore = parseInt(rawScore, 10);
    const currentTotal = parseInt(rawTotal, 10);
    const currentStreak = parseInt(rawHighStreak, 10);
    const currentMin = parseInt(rawMin, 10);
    const currentSec = parseInt(rawSec, 10);

    // Update the UI states with the current values
    setScore(currentScore);
    setTotal(currentTotal);
    sethighStreak(currentStreak);
    setTime({ minutes: currentMin, seconds: currentSec });

    // 1. Best Score
    const rawBestScore = sessionStorage.getItem("bestScore");
    let bestScore = rawBestScore ? parseInt(rawBestScore, 10) : 0;
    if (currentScore >= bestScore){
      bestScore = currentScore;
      sessionStorage.setItem("bestScore", bestScore.toString())
      setIsNewBestScore(true)
    }

    // 2. Highest Streak Logic
    const rawHighestStreak = sessionStorage.getItem("highestStreak");
    let bestStreak = rawHighestStreak ? parseInt(rawHighestStreak, 10) : 0;

    // Compare local variables to check for a new record
    if (currentStreak >= bestStreak) {
      bestStreak = currentStreak; // The player broke their record
      sessionStorage.setItem("highestStreak", bestStreak.toString()); // Save new record
      setIsNewStreakRecord(true);
    }
    setHighestStreak(bestStreak); // Update the UI state

    // 3. Best Time Logic
    const rawBestMin = sessionStorage.getItem("bestTimeInMinute");
    const rawBestSec = sessionStorage.getItem("bestTimeInSecond");

    let bestMin = currentMin;
    let bestSec = currentSec;

    if (rawBestMin !== null && rawBestSec !== null) {
      const previousBestMin = parseInt(rawBestMin, 10);
      const previousBestSec = parseInt(rawBestSec, 10);

      // Convert time to seconds to make the math comparison easier
      const currentTimeInSeconds = currentMin * 60 + currentSec;
      const previousBestInSeconds = previousBestMin * 60 + previousBestSec;

      // Assuming lower time is better (if higher is better, change < to >)
      if (currentTimeInSeconds <= previousBestInSeconds) {
        sessionStorage.setItem("bestTimeInMinute", currentMin.toString());
        sessionStorage.setItem("bestTimeInSecond", currentSec.toString());
        setIsNewBestTime(true);
      } else {
        // Record not broken, keep the previous best time for the UI
        bestMin = previousBestMin;
        bestSec = previousBestSec;
      }
    } else {
      // First time playing, save this as the best time
      sessionStorage.setItem("bestTimeInMinute", currentMin.toString());
      sessionStorage.setItem("bestTimeInSecond", currentSec.toString());
    }

    // Update the UI with the best time
    setBestTime({ minutes: bestMin, seconds: bestSec });
  }, [router]);

  const formattedTime = (time) =>
    `${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  const percentage = total > 0 ? (score / total) * 100 : 0;

  function ConfettiFireworks() {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  return (
    <>
      <Header score={score} />

      <div className={styles.page}>
        {(isNewStreakRecord || isNewBestTime || isNewBestScore) && (
          <ConfettiFireworks></ConfettiFireworks>
        )}
        <div className={styles.card}>
          <h2 className={styles.title}>{t("endingPage.title")}</h2>
          <h2 className={styles.title}>{t("endingPage.newRecord")}</h2>

          <div className={styles.progressContainer}>
            <CircularProgressBar percentage={percentage} />
            <p className={styles.scoreText}>
              {`${t("endingPage.score")}${score} / ${total}`}
            </p>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statIcon}>🔥</span>
              <span className={styles.statValue}>{highStreak}</span>
              <span className={styles.statLabel}>
                {t("endingPage.highStreak")}
              </span>
            </div>

            <div className={styles.statBox}>
              <span className={styles.statIcon}>⏱️</span>
              <span className={styles.statValue}>{formattedTime(time)}</span>
              <span className={styles.statLabel}>
                {t("endingPage.timeTaken")}
              </span>
            </div>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statIcon}>🔥</span>
              <span className={styles.statValue}>{highestStreak}</span>
              <span className={styles.statLabel}>
                {t("endingPage.highestStreak")}
              </span>
            </div>

            <div className={styles.statBox}>
              <span className={styles.statIcon}>⏱️</span>
              <span className={styles.statValue}>
                {formattedTime(bestTime)}
              </span>
              <span className={styles.statLabel}>
                {t("endingPage.bestTime")}
              </span>
            </div>
          </div>

          {/* Return Button */}
          <div className={styles.actionContainer}>
            <ReturnButton href={"/AllCountiresGame"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EndingScreen;
