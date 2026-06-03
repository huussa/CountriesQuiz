"use client";

import styles from "./page.module.css";
import Header from "./components/header";
import QuestionCard from "./components/question-card";
import { useEffect, useState } from "react";

function getRandomItems(array, count, exclude = null) {
  const filtered = array.filter((item) => item.name.common !== exclude);

  return [...filtered].sort(() => Math.random() - 0.5).slice(0, count);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function generateQuestion(data) {
    const correct = data[Math.floor(Math.random() * data.length)];

    const wrong = getRandomItems(data, 3, correct.name.common);

    const options = shuffle([correct, ...wrong]);

    setQuestion({
      flag: correct.flags.png,
      correct: correct.name.common,
      options: options.map((c) => ({
        name: c.name.common,
        code: c.cca2,
      })),
    });
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/independent?status=true&fields=name,flags,cca2",
        );

        const data = await res.json();

        setCountries(data);
        generateQuestion(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header header={styles.header} score={styles.score} />

      <div className={styles.page}>
        <QuestionCard
          card={styles.card}
          flag={question?.flag}
          options={question?.options || []}
        />
      </div>
    </>
  );
}

export default App;
