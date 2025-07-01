import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

const app_langs = {
  en: { nativeName: "English" },
  ar: { nativeName: "Arabic" }
} as const

export const Header = () => {
  const { i18n } = useTranslation()

  return (
    <header className="card-bg flex items-center justify-between rounded-full">
      <img
        src="/logo.svg"
        alt="logo speed test"
        className="fade-in size-10 animate-in duration-700"
      />

      <Select value={i18n.resolvedLanguage} onValueChange={(lng) => i18n.changeLanguage(lng)}>
        <SelectTrigger className="rounded-full px-4 py-5">
          <SelectValue placeholder={i18n.resolvedLanguage}>
            <Languages />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.keys(app_langs).map((language) => (
            <SelectItem
              value={language}
              key={language}
              disabled={language === i18n.resolvedLanguage}>
              {app_langs[language as keyof typeof app_langs].nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}
