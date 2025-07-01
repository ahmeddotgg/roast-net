import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRoastStore } from "@/modules/speed-roast/store"
import { useSpeedTestStore } from "@/modules/speed-test/store"
import { usePreferencesStore } from "@/modules/user-preferences/store"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const RoastDialog = () => {
  const [open, setOpen] = useState(false)

  const { t, i18n } = useTranslation()

  const { reset: resetSpeed } = useSpeedTestStore()
  const { language } = usePreferencesStore()
  const { status, message, generateRoast, reset: resetRoast } = useRoastStore()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      resetSpeed()
      resetRoast()
    }
  }

  const handleTriggerClick = () => {
    setOpen(true)
    generateRoast()
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button onClick={handleTriggerClick} variant="cta" disabled={status === "loading"}>
          {t("roast.ask_ai")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}
        onEscapeKeyDown={(e) => {
          if (status === "loading") e.preventDefault()
        }}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">{t("roast.result_title")}</AlertDialogTitle>
          <p className={cn("text-muted-foreground text-xs", message && "hidden")}>
            {t("roast.result_subtitle")}
          </p>
        </AlertDialogHeader>
        <div className="rounded-md bg-accent/30 p-4 font-semibold text-muted-foreground">
          {message && (
            <h2 dir={language === "Arabic" ? "rtl" : "ltr"} className="mb-4 leading-8">
              {message}
            </h2>
          )}
          {status === "loading" && (
            <h2 className="flex items-center gap-2">
              <Loader className="animate-spin" /> <span>{t("roast.thinking")}</span>
            </h2>
          )}
        </div>
        <AlertDialogDescription className="sr-only">
          {t("roast.dialog_label")}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={status === "loading"}>{t("roast.close")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
