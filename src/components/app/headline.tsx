import { useTranslation } from "react-i18next"
import { UsageFeedback } from "./usage-feedback"

export const HeadLine = () => {
  const { t, i18n } = useTranslation()
  return (
    <div className="space-y-4">
      <UsageFeedback />
      <h1
        dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}
        className="fade-in slide-in-from-bottom-10 animate-in text-balance bg-gradient-to-b from-blue-500 to-red-400 bg-clip-text text-center font-bold text-3xl text-transparent leading-10 duration-1000 sm:text-4xl sm:leading-12">
        {t("heroText")} :)
      </h1>
    </div>
  )
}
