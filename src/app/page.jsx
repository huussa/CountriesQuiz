"use client";

import Link from "next/link";
import Header from "./AllCountiresGame/components/header";
import styles from "./page.module.css";
import { useTranslation } from 'react-i18next';

function Home() {
  const { t, i18n } = useTranslation();
  const dir = i18n.language
  return (
      <div className={styles.menu}>
        <Header score={-1} />
        <div className={styles.menuContainer}>
          <h1 className={styles.title}>{t("mainPage.title")}</h1>
          <p className={styles.subtitle}>{t("mainPage.description")}</p>
          
          <div className={styles.menuButtons}>
            <Link href="/AllCountiresGame" className={styles.menuBtn}>
              <span>{t("buttons.startGame")}</span>
            </Link>
          </div>

          <div className={styles.info} dir={dir === "ar" ? "rtl" : "ltr"}>
            <h3>{t("mainPage.howToPlay")}</h3>
            <ul>
              <li>{t("mainPage.howToPlayStep1")}</li>
              <li>{t("mainPage.howToPlayStep2")}</li>
              <li>{t("mainPage.howToPlayStep3")}</li>
            </ul>
          </div>
        </div>
      </div>
  );
}
export default Home;