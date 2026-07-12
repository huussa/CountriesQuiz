"use client";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import global_ar from "./translations/ar.json";
import global_en from "./translations/en.json";



i18n.use(initReactI18next).init({
    resources: {
  ar: {
    translation : global_ar
  },
  en: {
    translation : global_en
  }
},
    lng: "ar",
    fallbackLng: "ar",
    defaultNS: "translation",
    interpolation: {escapeValue: false}
  });

export default i18n;