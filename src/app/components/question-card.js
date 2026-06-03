function QuestionCard({ card, flag, options }) {
  const countryNames = new Intl.DisplayNames(["ar"], {
    type: "region",
  });
  const specialNames = {
    HK: "هونغ كونغ",
    MM: "بورما",
    TL: "تيمور",
    CD: "جمهورية الكونقو",
  };
  return (
    <div className={card}>
      <h2>what is the name of this country?</h2>
      <img src={flag} alt="country flag" />
      {options.map((opt) => (
        <button key={opt.code}>
          {specialNames[opt.code] || countryNames.of(opt.code) || opt.name}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
