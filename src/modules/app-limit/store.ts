import { toast } from "sonner"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppLimitState {
  count: number
  cooldownEndTime: number | null
  usageLimit: number
  cooldownDuration: number

  recordUsage: () => void
  getRemainingUses: () => number
  isOnCooldown: () => boolean
  getCooldownRemainingTime: () => number
  _checkAndResetCooldown: () => void
}

export const useAppLimit = create<AppLimitState>()(
  persist(
    (set, get) => ({
      count: 0,
      cooldownEndTime: null,
      usageLimit: 3,
      cooldownDuration: 24 * 60 * 60 * 1000,

      _checkAndResetCooldown: () => {
        const { cooldownEndTime } = get()
        if (cooldownEndTime !== null && Date.now() >= cooldownEndTime) {
          set({ count: 0, cooldownEndTime: null })
        }
      },

      recordUsage: () => {
        get()._checkAndResetCooldown()

        const { count, usageLimit, cooldownEndTime } = get()

        if (cooldownEndTime !== null && Date.now() < cooldownEndTime) {
          toast.warning("Cannot record usage: currently on cooldown.")
          return
        }

        if (count < usageLimit) {
          set((state) => ({ count: state.count + 1 }))
        }

        if (get().count >= usageLimit) {
          set({ cooldownEndTime: Date.now() + get().cooldownDuration })
        }
      },

      getRemainingUses: () => {
        get()._checkAndResetCooldown()
        const { count, usageLimit, cooldownEndTime } = get()

        if (cooldownEndTime !== null && Date.now() < cooldownEndTime) {
          return 0
        }
        return Math.max(0, usageLimit - count)
      },

      isOnCooldown: () => {
        get()._checkAndResetCooldown()
        const { cooldownEndTime } = get()
        return cooldownEndTime !== null && Date.now() < cooldownEndTime
      },

      getCooldownRemainingTime: () => {
        get()._checkAndResetCooldown()
        const { cooldownEndTime } = get()

        if (cooldownEndTime === null) return 0
        return Math.max(0, cooldownEndTime - Date.now())
      }
    }),
    {
      name: "app-limit-storage",
      partialize: (state) => ({
        count: state.count,
        cooldownEndTime: state.cooldownEndTime
      })
    }
  )
)
