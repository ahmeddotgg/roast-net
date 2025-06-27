import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useSpeedTestStore } from "@/modules/speed-test/store"
import { Settings } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/ui/button"
import { preferencesData, usePreferencesStore } from "../store"

export const PreferencesDialog = () => {
  const { setPreference, ...preferences } = usePreferencesStore()
  const { status } = useSpeedTestStore()
  const { t, i18n } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" disabled={status === "testing"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="pb-4">{t("preferences.title")}</DialogTitle>
          <div className="space-y-8 rounded-md bg-popover/70 p-4">
            {preferencesData.map((pref) => (
              <div key={pref.key} className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <h2 className="flex items-center gap-2 font-medium">
                  <pref.icon size={20} strokeWidth={2.2} className={pref.iconColor} />
                  {t(pref.labelKey)}:
                </h2>
                <Select
                  value={preferences[pref.key as keyof typeof preferences] as string}
                  onValueChange={(value) => setPreference(pref.key, value)}>
                  <SelectTrigger className="min-w-28">
                    <SelectValue placeholder={t(pref.placeholderKey)} />
                  </SelectTrigger>
                  <SelectContent>
                    {pref.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(option.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
