import styles from "../page.module.css";

function Header({ score }) {
  return (
    <header className={styles.header}>
      <h1>Countries Quiz</h1>

      <div style={{display: `${score < 0 ? "none" : "block"}`}}>
        <p className={styles.score}>Score: {score}</p>
      </div>
    </header>
  );
}
export default Header;
