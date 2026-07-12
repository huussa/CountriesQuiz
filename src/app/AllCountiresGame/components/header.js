import styles from "../page.module.css";
import { useTranslation } from 'react-i18next';

function Header({ score }) {
  const { t } = useTranslation();
  return (
    <header className={styles.header}>
      <h1>Countries Game</h1>

      <div style={{display: `${score < 0 ? "none" : "block"}`}}>
        <p className={styles.score}>{t("gamePage.score")} {score}</p>
      </div>
    </header>
  );
}
export default Header;
