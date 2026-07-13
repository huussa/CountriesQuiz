import styles from "../page.module.css";
import { useTranslation } from "react-i18next";

function QuestionCard({
  img,
  options,
  number,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
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
      <h2 dir={dir === "ar" ? "rtl" : "ltr"}>{number}. {t("gamePage.question")}</h2>
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
