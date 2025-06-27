import { Flag, Flame, Languages } from "lucide-react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PreferencesState {
  language: string
  dialect: string
  tone: string

  setPreference: (key: string, value: string) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: "Arabic",
      dialect: "Egyptian",
      tone: "Brutal",

      setPreference: (key, value) => set({ [key]: value })
    }),
    {
      name: "speed-test-preferences"
    }
  )
)

export const preferencesData = [
  {
    key: "language",
    labelKey: "preferences.language.label",
    placeholderKey: "preferences.language.placeholder",
    icon: Languages,
    iconColor: "text-red-400",
    options: [
      { value: "English", labelKey: "preferences.language.options.english" },
      { value: "Arabic", labelKey: "preferences.language.options.arabic" }
    ]
  },
  {
    key: "dialect",
    labelKey: "preferences.dialect.label",
    placeholderKey: "preferences.dialect.placeholder",
    icon: Flag,
    iconColor: "text-green-400",
    options: [
      { value: "American", labelKey: "preferences.dialect.options.american" },
      { value: "Egyptian", labelKey: "preferences.dialect.options.egyptian" }
    ]
  },
  {
    key: "tone",
    labelKey: "preferences.tone.label",
    placeholderKey: "preferences.tone.placeholder",
    icon: Flame,
    iconColor: "text-orange-400",
    options: [
      { value: "Sarcastic", labelKey: "preferences.tone.options.sarcastic" },
      { value: "Brutal", labelKey: "preferences.tone.options.brutal" },
      { value: "Friendly", labelKey: "preferences.tone.options.friendly" }
    ]
  }
]
