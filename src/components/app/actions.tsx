import { useAppLimitFeedback } from "@/modules/app-limit/useAppLimitFeedback"
import { RoastDialog } from "@/modules/speed-roast/components/roast-dialog"
import { useSpeedTestStore } from "@/modules/speed-test/store"
import { PreferencesDialog } from "@/modules/user-preferences/components/preferences-dialog"
import { Loader } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"

export const Actions = () => {
  const { t, i18n } = useTranslation()
  const { status, runSpeedTest } = useSpeedTestStore()
  const { isAllowed } = useAppLimitFeedback()

  return (
    <div className="flex items-center gap-2" dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <div className="grow [&>button]:h-12 [&>button]:w-full [&>button]:rounded-full [&>button]:font-semibold">
        {status !== "completed" ? (
          <Button onClick={runSpeedTest} variant="cta" disabled={status !== "idle" || !isAllowed}>
            {status === "testing" ? <Loader className="animate-spin" /> : t("cta.start")}
          </Button>
        ) : null}

        {status === "completed" ? <RoastDialog /> : null}
      </div>
      <PreferencesDialog />
    </div>
  )
}
