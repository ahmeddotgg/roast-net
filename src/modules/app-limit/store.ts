import { create } from "zustand"

interface AppLimitState {
  count: number
  increment: () => void
}

export const useAppLimit = create<AppLimitState>((set) => ({
  count: 0,

  increment: () => set((state) => ({ count: state.count + 1 }))
}))
