import { TriangleAlert } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAppLimit } from "../store"

export const UsageFeedback = () => {
  const { t, i18n } = useTranslation()

  const { getRemainingUses, usageLimit } = useAppLimit()

  const remainingUses = getRemainingUses()

  return (
    <div
      className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-amber-950/50 px-3 py-1 font-medium text-amber-500 text-xs"
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <TriangleAlert size={14} className="hidden min-[300px]:block" />

      <span className="line-clamp-1">
        {t("limit.remaining", { remaining: remainingUses, total: usageLimit })}
      </span>
    </div>
  )
}
