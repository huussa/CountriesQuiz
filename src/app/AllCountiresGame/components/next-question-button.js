import styles from "../page.module.css";
import { useTranslation } from 'react-i18next';

function NextQuestionButton({ onClick, lastQuestion = false }) {
  const { t } = useTranslation();
  return <span className={styles.nextQuestionButton} onClick={onClick}>
    {lastQuestion ? t("buttons.end"): t("buttons.next") }
  </span>;
}
export default NextQuestionButton;
