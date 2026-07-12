"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Header from "./components/header"
import AllCountiresGame from "./components/countries-game";
import { useTranslation } from 'react-i18next';

function Game() {
  const [selectedRegion, setSelectedRegion] = useState("allRegions");
  const [selectedLimit, setSelectedLimit] = useState("All");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const { t, i18n } = useTranslation();
  const dir = i18n.language
  const regions = [
    {
      id: "allRegions",
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
      <Header score={-1} />
      
      <h1>{t('gameSettingsPage.title')}</h1>

      <div className={styles.settingsSection}>
        <h2>{t('gameSettingsPage.region')}</h2>
        <div className={styles.buttons}>
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`${styles.nextQuestionButton} ${selectedRegion === region.id ? styles.active : ""}`}
            >
              {t(`regions.${region.id}`)}
            </button>
          ))}
        </div>
      </div>

      <div dir={dir === "ar" ? "rtl" : "ltr"} className={styles.settingsSection}>
        <h2>{t('gameSettingsPage.limit')}</h2>
        <div className={styles.buttons}>
          {currentRegionObject.limits.map((limit) => (
            <button
              key={limit}
              onClick={() => setSelectedLimit(limit)}
              className={`${styles.nextQuestionButton} ${selectedLimit === limit ? styles.active : ""}`}
            >
              {limit === "All" ? t('words.all') : `${limit} ${t('words.countries')}`}
            </button>
          ))}
        </div>
      </div>
      
      <button className={styles.nextQuestionButton} onClick={handleStartGame}>
        {t('buttons.startGame')}
      </button>
    </div>
  );
}

export default Game;