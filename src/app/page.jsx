"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.menu}>
      <div className={styles.menuContainer}>
        <h1 className={styles.title}>🌍 Countries Quiz</h1>
        <p className={styles.subtitle}>Test your knowledge about countries around the world!</p>
        
        <div className={styles.menuButtons}>
          <Link href="/CountiresGame" className={styles.menuBtn}>
            <span>🚀 Start Game</span>
            <span className={styles.btnSubtext}>All Countries</span>
          </Link>
        </div>

        <div className={styles.info}>
          <h3>How to Play:</h3>
          <ul>
            <li>Look at the country flag</li>
            <li>Select the correct country name in Arabic</li>
            <li>Get as many correct as you can!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
