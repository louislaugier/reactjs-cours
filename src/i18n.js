import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import transFr from "./translations/fr";
import transEn from "./translations/en";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation : transFr
      },
      en: {
        translation: transEn
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;