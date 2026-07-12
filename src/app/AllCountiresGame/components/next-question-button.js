import styles from "../page.module.css";
import { useTranslation } from 'react-i18next';

function NextQuestionButton({ onClick }) {
  const { t } = useTranslation();
  return <span className={styles.nextQuestionButton} onClick={onClick}>
    {t("buttons.next")}
  </span>;
}
export default NextQuestionButton;
