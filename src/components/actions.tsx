import { formatTime, useCountdown } from "@/modules/app-limit/hooks/use-count-down"
import { useAppLimit } from "@/modules/app-limit/store"
import { RoastDialog } from "@/modules/speed-roast/components/roast-dialog"
import { useSpeedTestStore } from "@/modules/speed-test/store"
import { PreferencesDialog } from "@/modules/user-preferences/components/preferences-dialog"
import { Loader } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"

export const Actions = () => {
  const { t, i18n } = useTranslation()
  const { status, runSpeedTest } = useSpeedTestStore()

  const { isOnCooldown, cooldownEndTime } = useAppLimit()
  const onCooldown = isOnCooldown()
  const countdownRemainingMs = useCountdown(cooldownEndTime)

  return (
    <div className="flex items-center gap-2" dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <div className="grow [&>button]:h-12 [&>button]:w-full [&>button]:rounded-full [&>button]:font-semibold">
        {status !== "completed" ? (
          <Button onClick={runSpeedTest} variant="cta" disabled={status !== "idle" || onCooldown}>
            {status === "testing" ? (
              <Loader className="animate-spin" />
            ) : onCooldown ? (
              <span>
                {t("limit.remaining_time")} {formatTime(countdownRemainingMs)} ⌛
              </span>
            ) : (
              t("cta.start")
            )}
          </Button>
        ) : (
          <RoastDialog />
        )}
      </div>
      <PreferencesDialog />
    </div>
  )
}
