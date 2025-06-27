import { create } from "zustand"
import { requestRoast, roastPrompt } from "./roast-client"

type RoastStatus = "idle" | "loading" | "success" | "error"

interface RoastStore {
  status: RoastStatus
  message: string
  error: string | null
  generateRoast: () => Promise<void>
  reset: () => void
}

export const useRoastStore = create<RoastStore>((set) => ({
  status: "idle",
  message: "",
  error: null,

  generateRoast: async () => {
    set({ status: "loading", error: null, message: "" })

    try {
      const prompt = roastPrompt()
      const message = await requestRoast(prompt)

      set({ status: "success", message })
    } catch (err) {
      set({
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error"
      })
    }
  },

  reset: () => set({ status: "idle", message: "", error: null })
}))
