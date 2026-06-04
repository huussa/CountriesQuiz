import styles from "../page.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>Countries Quiz</h1>

      <div><p className={styles.score}>Best Score: 0</p></div>
    </header>
  );
}
export default Header;
