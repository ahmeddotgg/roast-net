import { useUsageStore } from "@/lib/store/usage"
import { TriangleAlert } from "lucide-react"
import { useTranslation } from "react-i18next"

export const UsageFeedback = () => {
  const { t, i18n } = useTranslation()
  const { count } = useUsageStore()
  const remaining = Math.max(3 - count, 0)

  return (
    <p
      className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-amber-950/50 px-3 py-1 font-medium text-amber-500 text-xs"
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <TriangleAlert size={14} />
      <span>{t("limit.remaining", { count: remaining })}</span>
    </p>
  )
}
