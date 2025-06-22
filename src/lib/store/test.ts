import ndt7 from "@m-lab/ndt7"
import { create } from "zustand"
import { usePreferencesStore } from "./preferences"
import { useUsageStore } from "./usage"

interface TestStore {
  loading: boolean
  state: "idle" | "testing" | "completed" | "roasting"
  downloadProgress: number
  uploadProgress: number
  downloadSpeed: number
  uploadSpeed: number
  aiMessage: string | null

  startTest: () => void
  askAI: () => void
  resetState: () => void
}

const initialState = {
  loading: false,
  state: "idle" as const,
  downloadProgress: 0,
  uploadProgress: 0,
  downloadSpeed: 0,
  uploadSpeed: 0,
  aiMessage: null
}

export const useTestStore = create<TestStore>((set, get) => ({
  ...initialState,

  resetState: () => {
    set(initialState)
  },

  startTest: () => {
    const { disabled, increment } = useUsageStore.getState()
    if (disabled) return
    increment()
    set({
      loading: true,
      state: "testing",
      downloadProgress: 0,
      uploadProgress: 0,
      downloadSpeed: 0,
      uploadSpeed: 0,
      aiMessage: null
    })

    const expectedDownloadDuration = 15
    const expectedUploadDuration = 10

    ndt7.test(
      {
        userAcceptedDataPolicy: true,
        downloadworkerfile: "/ndt7-download-worker.min.js",
        uploadworkerfile: "/ndt7-upload-worker.min.js"
      },
      {
        downloadMeasurement: (data) => {
          const elapsed = data.Data?.ElapsedTime
          const speed = data.Data?.MeanClientMbps

          if (typeof elapsed === "number") {
            const progress = Math.min((elapsed / expectedDownloadDuration) * 100, 100)
            set({ downloadProgress: Math.round(progress) })
          }

          if (typeof speed === "number") {
            set({ downloadSpeed: speed })
          }
        },

        downloadComplete: (data) => {
          const final = data.LastClientMeasurement?.MeanClientMbps ?? 0
          set({ downloadSpeed: final, downloadProgress: 100 })
        },

        uploadMeasurement: (data) => {
          const elapsedMicro = data.Data?.TCPInfo?.ElapsedTime
          const bytes = data.Data?.TCPInfo?.BytesReceived

          if (typeof elapsedMicro === "number" && elapsedMicro > 0) {
            const elapsedSec = elapsedMicro / 1_000_000
            const progress = Math.min((elapsedSec / expectedUploadDuration) * 100, 100)
            set({ uploadProgress: Math.round(progress) })

            if (typeof bytes === "number") {
              const mbps = (bytes * 8) / elapsedMicro
              set({ uploadSpeed: mbps })
            }
          }
        },

        uploadComplete: () => {
          set({
            loading: false,
            state: "completed",
            uploadProgress: 100
          })
        },

        error: () => {
          set({ loading: false, state: "idle" })
        }
      }
    )
  },

  askAI: async () => {
    set({ state: "roasting", aiMessage: null })

    try {
      const { dialect, language, tone } = usePreferencesStore.getState()
      const { downloadSpeed, uploadSpeed } = get()
      const content = `Roast my internet speed — download: ${downloadSpeed}, upload: ${uploadSpeed}.
                      Instructions:
                      - Respond strictly and entirely in **${language}** only${dialect ? `, using the ${dialect} dialect for tone and cultural flavor` : ""}.
                      - **Do not** mix languages or provide translations.
                      - Use **Arabic script and RTL direction** when Arabic is selected.
                      - Keep it sane length: **6–10 sentences max**.
                      - Tone: ${tone || "humorous, exaggerated, culturally savage"}.
                      - Include emojis naturally in the response.
                      - Base the humor on cultural references from the ${dialect ?? "relevant"} context (e.g., food, traffic, sayings).
                      - Ensure perfect grammar and spelling, especially in Arabic.
                      - Do **not** explain or comment on any words or phrases.`

      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content })
      })

      const { reply } = await res.json()

      set({
        state: "completed",
        aiMessage: reply || "No roast generated."
      })
    } catch (error) {
      set({
        state: "completed",
        aiMessage: `Failed to generate roast. Please try again, ${error}`
      })
    }
  }
}))
