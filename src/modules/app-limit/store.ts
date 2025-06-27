import { differenceInMilliseconds, subMinutes } from "date-fns"
import { create, type StoreApi } from "zustand"
import { persist } from "zustand/middleware"

function checkAndClearCooldown(state: AppLimitState, set: StoreApi<AppLimitState>["setState"]) {
  if (state.cooldownEndTimestamp && state.cooldownEndTimestamp < Date.now()) {
    set({
      count: 0,
      cooldownEndTimestamp: null,
      lastUsedTimestamp: null
    })
    return {
      ...state,
      count: 0,
      cooldownEndTimestamp: null,
      lastUsedTimestamp: null
    }
  }
  return state
}

interface AppLimitState {
  count: number
  lastUsedTimestamp: number | null
  cooldownEndTimestamp: number | null

  incrementCount: () => void
  resetCount: () => void
  startCooldown: () => void
  clearCooldown: () => void
}

export const MAX_USES = 3
export const COOLDOWN_MINUTES = 360

export const useAppLimitStore = create<AppLimitState>()(
  persist(
    (set, get) => {
      const state = {
        count: 0,
        lastUsedTimestamp: null,
        cooldownEndTimestamp: null,

        incrementCount: () => {
          const now = Date.now()
          set({
            count: get().count + 1,
            lastUsedTimestamp: now
          })

          if (get().count >= MAX_USES) {
            const cooldownEnd = subMinutes(now, -COOLDOWN_MINUTES).getTime()
            set({ cooldownEndTimestamp: cooldownEnd })

            const timeout = differenceInMilliseconds(cooldownEnd, now)
            setTimeout(() => get().clearCooldown(), timeout)
          }
        },

        resetCount: () => set({ count: 0, lastUsedTimestamp: null }),

        startCooldown: () => {
          const cooldownEnd = subMinutes(Date.now(), -COOLDOWN_MINUTES).getTime()
          set({ cooldownEndTimestamp: cooldownEnd })
        },

        clearCooldown: () =>
          set({
            count: 0,
            cooldownEndTimestamp: null,
            lastUsedTimestamp: null
          })
      }
      return checkAndClearCooldown(state, set)
    },
    {
      name: "app-limit",
      partialize: (state) => ({
        count: state.count,
        lastUsedTimestamp: state.lastUsedTimestamp,
        cooldownEndTimestamp: state.cooldownEndTimestamp
      })
    }
  )
)
