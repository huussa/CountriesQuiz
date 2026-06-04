import styles from "../page.module.css";

function Header({bestScore}) {
  return (
    <header className={styles.header}>
      <h1>Countries Quiz</h1>

      <div><p className={styles.score}>Best Score: {bestScore}</p></div>
    </header>
  );
}
export default Header;
