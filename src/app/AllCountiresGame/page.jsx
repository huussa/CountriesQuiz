"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Header from "./components/header";
import AllCountiresGame from "./components/countries-game";
import { useTranslation } from "react-i18next";

function Game() {
  const [selectedRegion, setSelectedRegion] = useState("allRegions");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const { t, i18n } = useTranslation();
  const regions = [
    "allRegions",
    "Asia",
    "Europe",
    "Africa",
    "Americas",
    "Oceania",
  ];

  function handleStartGame() {
    setIsGameStarted(true);
  }

  if (isGameStarted) {
    return <AllCountiresGame region={selectedRegion} />;
  }

  return (
    <div className={styles.page}>
      <Header score={-1} />

      <h1 className={styles.pageTitle}>{t("gameSettingsPage.title")}</h1>

      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>{t("gameSettingsPage.region")}</h2>
        <div className={styles.buttons}>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`${styles.regionsSelectionButton} ${selectedRegion === region ? styles.active : ""}`}
            >
              {t(`regions.${region}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Primary start button */}
      <button className={styles.startButton} onClick={handleStartGame}>
        {t("buttons.startGame")}
      </button>
    </div>
  );
}

export default Game;
