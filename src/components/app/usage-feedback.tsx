import { TriangleAlert } from "lucide-react"
import { useTranslation } from "react-i18next"

export const UsageFeedback = () => {
  const { t, i18n } = useTranslation()
  const disabled = false

  return (
    <div
      className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-amber-950/50 px-3 py-1 font-medium text-amber-500 text-xs"
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <TriangleAlert size={14} className="hidden min-[300px]:block" />

      {disabled && (
        <p className="flex items-center gap-1">
          <span className="line-clamp-1">{t("limit.remaining_time")}</span>
          <span className="min-w-9 font-bold">(8)</span>
        </p>
      )}

      {!disabled && <span className="tabular-nums">{t("limit.remaining")} 10</span>}
    </div>
  )
}
