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
import { usePreferencesStore } from "@/lib/store/preferences"
import { useTestStore } from "@/lib/store/test"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"

export const RoastDialog = () => {
  const { t, i18n } = useTranslation()
  const { state, aiMessage, askAI, resetState, loading } = useTestStore()
  const { language } = usePreferencesStore()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      resetState()
    }
  }

  const handleTriggerClick = () => {
    setOpen(true)
    askAI()
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button onClick={handleTriggerClick} variant="cta" disabled={loading}>
          {state === "roasting" ? <Loader className="animate-spin" /> : t("roast.ask_ai")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">{t("roast.result_title")}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="rounded-md bg-accent/30 p-4 font-semibold text-muted-foreground">
          {aiMessage && (
            <h2 dir={language === "Arabic" ? "rtl" : "ltr"} className="mb-4 leading-8">
              {aiMessage}
            </h2>
          )}
          {state === "roasting" && (
            <h2 className="flex items-center gap-2">
              <Loader className="animate-spin" /> <span>{t("roast.thinking")}</span>
            </h2>
          )}
        </div>
        <AlertDialogDescription className="sr-only">
          {t("roast.dialog_label")}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={state === "roasting"}>{t("roast.close")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
