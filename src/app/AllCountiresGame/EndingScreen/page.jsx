"use client";

import styles from "./page.module.css";
import Header from "../components/header";
import CircularProgressBar from "../components/circular-progress-bar";
import ReturnButton from "../components/return-button";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";

function EndingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const newScoreSound = useRef(null);

  useEffect(() => {
    newScoreSound.current = new Audio("/sounds/new-score.mp3");
  }, []);

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [highStreak, sethighStreak] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  const [bestScore, setBestScore] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [bestTime, setBestTime] = useState({ minutes: 0, seconds: 0 });

  const [isNewStreakRecord, setIsNewStreakRecord] = useState(false);
  const [isNewBestTime, setIsNewBestTime] = useState(false);
  const [isNewBestScore, setIsNewBestScore] = useState(false);

  useEffect(() => {
    // Get current game session data
    const rawScore = sessionStorage.getItem("scoreNow");
    const rawTotal = sessionStorage.getItem("totalNow");
    const rawHighStreak = sessionStorage.getItem("highStreakNow");
    const rawMin = sessionStorage.getItem("timeInMinute");
    const rawSec = sessionStorage.getItem("timeInSecond");
    const playedRegion = sessionStorage.getItem("playedRegion") || "allRegions";

    // Redirect to home if no data exists
    if (!rawScore && !rawTotal && !rawHighStreak && !rawMin && !rawSec) {
      router.push("/");
      return;
    }

    const currentScore = parseInt(rawScore, 10);
    const currentTotal = parseInt(rawTotal, 10);
    const currentStreak = parseInt(rawHighStreak, 10);
    const currentMin = parseInt(rawMin, 10);
    const currentSec = parseInt(rawSec, 10);

    setScore(currentScore);
    setTotal(currentTotal);
    sethighStreak(currentStreak);
    setTime({ minutes: currentMin, seconds: currentSec });

    // --- Region-based High Scores (Local Storage) ---
    const savedRecordsString = localStorage.getItem("flagGameRecords");
    let allRecords = savedRecordsString ? JSON.parse(savedRecordsString) : {};

    // Get or initialize region data
    let regionRecords = allRecords[playedRegion] || {
      bestScore: 0,
      highestStreak: 0,
      bestTimeInSeconds: Infinity,
    };

    // Check for new records
    if (currentScore > regionRecords.bestScore) {
      regionRecords.bestScore = currentScore;
      setIsNewBestScore(true);
    }

    if (currentStreak > regionRecords.highestStreak) {
      regionRecords.highestStreak = currentStreak;
      setIsNewStreakRecord(true);
    }

    const currentTimeInSeconds = currentMin * 60 + currentSec;
    if (currentTimeInSeconds < regionRecords.bestTimeInSeconds) {
      regionRecords.bestTimeInSeconds = currentTimeInSeconds;
      setIsNewBestTime(true);
    }

    // Save updated records to local storage
    allRecords[playedRegion] = regionRecords;
    localStorage.setItem("flagGameRecords", JSON.stringify(allRecords));

    // Update UI states
    setBestScore(regionRecords.bestScore);
    setHighestStreak(regionRecords.highestStreak);

    const finalBestMin = Math.floor(regionRecords.bestTimeInSeconds / 60);
    const finalBestSec = regionRecords.bestTimeInSeconds % 60;
    setBestTime({ minutes: finalBestMin, seconds: finalBestSec });
  }, [router]);

  // Confetti animation logic
  const fireConfetti = () => {
    const duration = 5 * 1000;
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
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // Trigger confetti on new record
  useEffect(() => {
    if (isNewStreakRecord || isNewBestTime || isNewBestScore) {
      fireConfetti();
      if (newScoreSound.current) {
        newScoreSound.current.play();
      }
    }
  }, [isNewStreakRecord, isNewBestTime, isNewBestScore]);

  const formattedTime = (timeData) =>
    `${timeData.minutes.toString().padStart(2, "0")}:${timeData.seconds.toString().padStart(2, "0")}`;

  const percentage = total > 0 ? (score / total) * 100 : 0;

  return (
    <>
      <Header score={score} />

      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>{t("endingPage.title")}</h2>

          {(isNewStreakRecord || isNewBestTime || isNewBestScore) && (
            <h2 className={styles.title} style={{ color: "#FFD700" }}>
              {t("endingPage.newRecord")}
            </h2>
          )}

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

          <div className={styles.actionContainer}>
            <ReturnButton href={"/AllCountiresGame"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EndingScreen;
