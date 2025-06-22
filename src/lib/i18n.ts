import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import ar from "./locals/ar.json"
import en from "./locals/en.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    }
  })

export default i18n
