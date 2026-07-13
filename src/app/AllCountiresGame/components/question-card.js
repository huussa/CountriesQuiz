import styles from "../page.module.css";
import ProgressBar from './progress-bar'
import Timer from "./timer";
import { useTranslation } from "react-i18next";

function QuestionCard({
  img,
  options,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
  currentIndex,
  totalQuestions,
  streak,
  totalSeconds,
}) {
  const { t, i18n } = useTranslation();
  const dir = i18n.language

  const getButtonClass = (opt) => {
    if (!isAnswered) return "";
    if (opt.name === correctAnswer) return styles.true;
    if (opt.name === selectedAnswer.name) return styles.false;
    return "";
  };
  const getCountryName = (country) => {
    if (i18n.language === 'ar' && country.nameAr) {
      return country.nameAr;
    }
    return country.name; 
  };

  return (
    <div className={styles.card}>
      <div style={{display: streak > 2 ? "block" : "none"}} dir={dir === "ar" ? "rtl" : "ltr"}>{`${t("gamePage.streak")} ${streak}🔥`}</div>
      <div className={styles.quizInformations}>
        <ProgressBar currentIndex={currentIndex} totalQuestions={totalQuestions} streak={streak}/>
        <Timer totalSeconds={totalSeconds}/>
      </div>
      <img src={img.src} alt={img.alt} />
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => onAnswer(opt)}
          className={getButtonClass(opt)}
        >
          {getCountryName(opt)}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
