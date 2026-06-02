'use client';

import styles from "./page.module.css";
import Header from "./components/header";

function Home() {
  return (
    <>
    <Header header={styles.header} score={styles.score} />
    <div className={styles.page}>
      
    </div>
    </>
  );
}

export default Home;