import { toast } from "sonner"
import { create } from "zustand"
import { MAX_USES, useAppLimitStore } from "../app-limit/store"
import { probeMlabServer, startSpeedTest } from "./ndt_client"

type SpeedTestState = {
  status: "idle" | "probing" | "testing" | "completed" | "rate-limited"
  speed: {
    download: number
    upload: number
  }
  progress: {
    download: number
    upload: number
  }

  setStatus: (status: SpeedTestState["status"]) => void
  setSpeed: (type: "download" | "upload", value: number) => void
  setProgress: (type: "download" | "upload", value: number) => void
  runSpeedTest: () => Promise<void>
  reset: () => void
}

export const useSpeedTestStore = create<SpeedTestState>((set, get) => ({
  status: "idle",
  speed: { download: 0, upload: 0 },
  progress: { download: 0, upload: 0 },

  setStatus: (status) => set({ status }),

  setSpeed: (type, value) =>
    set((state) => ({
      speed: { ...state.speed, [type]: value }
    })),

  setProgress: (type, value) =>
    set((state) => ({
      progress: { ...state.progress, [type]: value }
    })),

  reset: () =>
    set({
      status: "idle",
      speed: { download: 0, upload: 0 },
      progress: { download: 0, upload: 0 }
    }),
  runSpeedTest: async () => {
    const { count, cooldownEndTimestamp, incrementCount, resetCount } = useAppLimitStore.getState()
    const isAllowed = count < MAX_USES && !cooldownEndTimestamp

    if (!isAllowed) return

    const { reset, setStatus } = get()
    reset()
    setStatus("probing")

    const result = await probeMlabServer()

    if (result === "ok") {
      setStatus("testing")
      startSpeedTest()
      incrementCount()
    } else if (result === "rate-limit") {
      setStatus("rate-limited")
      resetCount()
      toast.warning("You're being rate-limited by ndt servers. Try again later.")
    }
  }
}))
