"use client";

import styles from "./page.module.css";
import Header from "./components/header";
import QuestionCard from "./components/question-card";
import NextQuestionButton from "./components/next-question-button";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function generateQuestion(correct) {

    const wrong = getRandomItems(countries, 3, correct.name.common);

    const options = shuffle([correct, ...wrong]);

    setQuestion({
      flag: correct.flags.png || correct.flags.svg,
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
        const shuffledCountries = shuffle(data);

        setCountries(shuffledCountries);
        // generateQuestion(data);

      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []); // [countries, currentIndex]

  useEffect(() => {
    if (!countries.length) return;

    generateQuestion(countries[currentIndex]);
  }, [countries, currentIndex]);

  function handleNextQuestion() {
    if (!selectedAnswer) {
      return;
    }
    if (currentIndex < countries.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      alert("No more questions available.");
    }
  }

  if (isLoading || !question) return <p>Loading...</p>;

  return (
    <>
      <Header />

      <div className={styles.page}>
        <>
        <QuestionCard
          flag={question?.flag}
          number={currentIndex + 1}
          options={question?.options || []}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
        />
        <NextQuestionButton nextQuestionButton={styles.nextQuestionButton} onClick={handleNextQuestion} />
        </>
      </div>
    </>
  );
}

export default App;
