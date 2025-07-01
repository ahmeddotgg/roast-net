import { TriangleAlert } from "lucide-react"
import { useTranslation } from "react-i18next"

export const UsageFeedback = () => {
  const { t, i18n } = useTranslation()

  return (
    <div
      className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-amber-950/50 px-3 py-1 font-medium text-amber-500 text-xs"
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <TriangleAlert size={14} className="hidden min-[300px]:block" />

      {i18n ? (
        <span>
          {t("limit.remaining")} ({1}/{1})
        </span>
      ) : (
        <span>
          {t("limit.remaining_time")} {Math.ceil(5000 / 1000)}s
        </span>
      )}
    </div>
  )
}
