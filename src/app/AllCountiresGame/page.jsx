"use client";

import { useState } from "react";
import styles from "./page.module.css";
import AllCountiresGame from "./components/countries-game";

function Game() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLimit, setSelectedLimit] = useState("All");

  const [isGameStarted, setIsGameStarted] = useState(false);

  const regions = [
    {
      id: "All",
      limits: [10, 20, 50, 100, "All"],
    },
    {
      id: "Asia",
      limits: [10, 20, 30, "All"],
    },
    {
      id: "Europe",
      limits: [10, 20, 30, "All"],
    },
    {
      id: "Africa",
      limits: [10, 20, 30, "All"],
    },
    {
      id: "Americas",
      limits: [10, 20, "All"],
    },
    {
      id: "Oceania",
      limits: [5, 10, "All"],
    },
  ];
  const currentRegionObject = regions.find((r) => r.id === selectedRegion);

  function handleStartGame() {
    setIsGameStarted(true);
  }

  if (isGameStarted) {
    return <AllCountiresGame region={selectedRegion} limit={selectedLimit} />;
  }
  return (
    <div className={styles.page}>
      <h1>Game Settings</h1>

      <div className={styles.settingsSection}>
        <h2>Select Region</h2>
        <div className={styles.buttons}>
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`${styles.nextQuestionButton} ${selectedRegion === region.id ? styles.active : ""}`}
            >
              {`${region.id} Region`}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h2>Select Limit</h2>
        <div className={styles.buttons}>
          {currentRegionObject.limits.map((limit) => (
            <button
              key={limit}
              onClick={() => setSelectedLimit(limit)}
              className={`${styles.nextQuestionButton} ${selectedLimit === limit ? styles.active : ""}`}
            >
              {`${limit} Countries`}
            </button>
          ))}
        </div>
      </div>
      <button className={styles.nextQuestionButton} onClick={handleStartGame}>
        🚀 Start Game
      </button>
    </div>
  );
}

export default Game;
