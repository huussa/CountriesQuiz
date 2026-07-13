"use client";

import styles from "../page.module.css";
import Header from "../components/header";
import CircularProgressBar from "../components/circular-progress-bar";
import ReturnButton from "../components/return-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function EndingScreen() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedScore = sessionStorage.getItem("scoreNow");
    const savedTotal = sessionStorage.getItem("totalNow");
    if (savedScore && savedTotal) {
      setScore(parseInt(savedScore));
      setTotal(parseInt(savedTotal));
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Header score={score} />

      <div className={styles.page}>
        <div className={styles.card}>
          <h2>🎉 you have finished the quiz</h2>
          <CircularProgressBar percentage={(score / total) * 100} />

          <ReturnButton href={"/AllCountiresGame"} />
        </div>
      </div>
    </>
  );
}

export default EndingScreen;
