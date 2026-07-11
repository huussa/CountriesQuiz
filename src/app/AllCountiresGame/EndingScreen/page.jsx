"use client"; // مهم جداً لأننا نستخدم hooks للمتصفح

import styles from "../page.module.css"
import Header from "../components/header";
import ReturnButton from "../components/return-button";
import { useSearchParams } from "next/navigation";

function EndingScreen() {
  const searchParams = useSearchParams();
  
  const score = Number(searchParams.get("score")) || 0;
  const total = Number(searchParams.get("total")) || 0;

  return (
    <>
      <Header score={score} />

      <div className={styles.page}>
        <h1>🎉 you have finished the quiz</h1>
        <p style={{ fontSize: "1.5rem" }}>
            your result is: {score}/{total}
        </p>
        <ReturnButton href={"/AllCountiresGame"}/>
      </div>

      
    </>
  );
}

export default EndingScreen;