"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";

function SwitchingButton() {
    const { i18n } = useTranslation();
    const toggleLanguage = () => {
        const newLang = i18n.language === "ar" ? "en" : "ar";
        
        i18n.changeLanguage(newLang);
  };
  return (
    <button 
        onClick={toggleLanguage}
        className={styles.switchingButton}
    >
        {i18n.language === "ar" ? "en" : "ar"}
    </button>
  )
}
export default SwitchingButton;