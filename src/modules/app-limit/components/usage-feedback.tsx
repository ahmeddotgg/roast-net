import { formatTime } from "@/lib/utils"
import { useAppLimitFeedback } from "@/modules/app-limit/useAppLimitFeedback"
import { TriangleAlert } from "lucide-react"
import { useTranslation } from "react-i18next"

export const UsageFeedback = () => {
  const { t, i18n } = useTranslation()
  const { remaining, isAllowed, remainingUses } = useAppLimitFeedback()

  return (
    <div
      className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-amber-950/50 px-3 py-1 font-medium text-amber-500 text-xs"
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <TriangleAlert size={14} className="hidden min-[300px]:block" />

      {isAllowed ? (
        <span>
          {t("limit.remaining")} ({remainingUses})
        </span>
      ) : (
        <span>
          {t("limit.remaining_time")} ({formatTime(Number(remaining))})
        </span>
      )}
    </div>
  )
}
