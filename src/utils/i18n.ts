//DEPENDENCIES
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//STATIC FILES
import enJSON from "../assets/locales/en.json";
import esJSON from "../assets/locales/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      es: { translation: esJSON },
    },
    fallbackLng: "en",
  });

export default i18n;
