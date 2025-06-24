import { useTestStore } from "@/lib/store/test"
import { Loader } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"
import { PreferencesDialog } from "./preferences-dialog"
import { RoastDialog } from "./roast-dialog"

export const Actions = () => {
  const { startTest, loading, state } = useTestStore()
  const { t, i18n } = useTranslation()

  return (
    <div className="flex items-center gap-2" dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <div className="grow [&>button]:h-12 [&>button]:w-full [&>button]:rounded-full [&>button]:font-semibold">
        {state === "idle" ? (
          <Button onClick={startTest} variant="cta" disabled={loading}>
            {t("cta.start")}
          </Button>
        ) : state === "testing" ? (
          <Button disabled variant="cta">
            <Loader className="animate-spin" />
          </Button>
        ) : state === "completed" || state === "roasting" ? (
          <RoastDialog />
        ) : null}
      </div>
      <PreferencesDialog />
    </div>
  )
}
