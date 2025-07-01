import { toast } from "sonner"
import { create } from "zustand"
import { useAppLimit } from "../app-limit/store"
import { checkServerBeforeTest, startSpeedTest } from "./ndt_client"

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

export const useSpeedTestStore = create<SpeedTestState>((set) => ({
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
    const { recordUsage, isOnCooldown } = useAppLimit.getState()

    if (isOnCooldown()) {
      toast.warning("Speed test is on cooldown.")
      set({ status: "idle" })
      return
    }

    const canTest = await checkServerBeforeTest()


    if (canTest) {
      startSpeedTest()
      recordUsage()
    } else {
      toast.error("Failed to start speed test. Please try again later.")
      set({ status: "idle" })
    }

    
  }
}))
