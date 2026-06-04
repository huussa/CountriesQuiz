import styles from "../page.module.css";
function NextQuestionButton({ onClick }) {
  return <button className={styles.nextQuestionButton} onClick={onClick}>
    Next Question
  </button>;
}
export default NextQuestionButton;
