"use client";

import styles from "../page.module.css";
import Header from "./header";
import ProgressBar from './progress-bar'
import QuestionCard from "./question-card";
import NextQuestionButton from "./next-question-button";
import ReturnButton from "./return-button";
import countriesData from "../../data/countries.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getRandomItems(array, count, exclude = null) {
  const filtered = array.filter((item) => item.name !== exclude);

  return [...filtered].sort(() => Math.random() - 0.5).slice(0, count);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function AllCountiresGame({ region = "allRegions", limit = "ِAll" }) {
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const router = useRouter()

  function generateQuestion(correct) {
    const wrong = getRandomItems(countries, 3, correct.name);

    const options = shuffle([correct, ...wrong]);

    setQuestion({
      img: correct.img,
      correct: correct.name,
      options: options.map((c) => ({
        name: c.name,
        nameAr: c.translations?.ar,
        code: c.iso2,
      })),
    });
  }

  useEffect(() => {
    let filteredCountries = countriesData;
    if (region !== "allRegions") {
      filteredCountries = countriesData.filter((c) => c.region === region);
    }

    const shuffledCountries = shuffle(filteredCountries);

    const limitedCountries =
      limit === "All" ? shuffledCountries : shuffledCountries.slice(0, limit);

    setCountries(limitedCountries);
    setIsLoading(false);
  }, [region, limit]);

  useEffect(() => {
    if (!countries.length) return;

    generateQuestion(countries[currentIndex]);
  }, [countries, currentIndex]);

  useEffect(() => {
    if (countries.length > 0 && currentIndex < countries.length - 1) {
      const nextCountry = countries[currentIndex + 1];

      if (nextCountry && nextCountry.img) {
        let imageStringUrl = "";

        if (typeof nextCountry.img === "string") {
          imageStringUrl = nextCountry.img;
        } else if (typeof nextCountry.img === "object") {
          imageStringUrl =
            nextCountry.img.src || nextCountry.img.png || nextCountry.img.svg;
        }

        if (imageStringUrl) {
          const img = new Image();
          img.src = imageStringUrl;
        }
      }
    }
  }, [currentIndex, countries]);

  function handleNextQuestion() {
    if (!selectedAnswer) {
      return;
    }
    if (currentIndex < countries.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      sessionStorage.setItem("score", score);
      sessionStorage.setItem("total", countries.length);
      router.push(`/AllCountiresGame/EndingScreen`);
    }
  }
  function handleSelectAnswer(option) {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option.name === question.correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  }

  if (isLoading || !question) return <p>Loading...</p>;

  return (
    <>
      <Header score={score} />

      <div className={styles.page}>
        <>
          <ProgressBar currentIndex={currentIndex} totalQuestions={countries.length} streak={streak}/>
          <QuestionCard
            img={question?.img}
            number={currentIndex + 1}
            options={question?.options || []}
            correctAnswer={question?.correct}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onAnswer={handleSelectAnswer}
          />
          <div style={{ display: "flex", gap: "10px"}}>
            <NextQuestionButton
              nextQuestionButton={styles.nextQuestionButton}
              onClick={handleNextQuestion}
              word={currentIndex === countries.length ? "Finish" : "Next"}
            />
            <ReturnButton href={""}/>
          </div>
        </>
      </div>
    </>
  );
}
export default AllCountiresGame;
