'use client';

import styles from "./page.module.css";
import Header from "./components/header";
import QuestionCard from "./components/question-card";
import countriesData from "./data/countries-data";



function App() {
  const countries = countriesData();
  return (
    <>
    <Header header={styles.header} score={styles.score} />
    <div className={styles.page}>
      <QuestionCard card={styles.card} flag={countries[0]?.flags?.svg} />
    </div>
    </>
  );
}

export default App;