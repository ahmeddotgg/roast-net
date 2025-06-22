import Cookies from "js-cookie"
import { create } from "zustand"

const USAGE_COOKIE_KEY = "test_usage"
const USAGE_LIMIT = 3
const USAGE_WINDOW_HOURS = 24

interface UsageCookie {
  count: number
  lastReset: number // timestamp (ms)
}

interface UsageStore {
  count: number
  disabled: boolean
  resetTime: number
  increment: () => void
  reset: () => void
  sync: () => void
}

function getInitialUsage(): UsageCookie {
  const raw = Cookies.get(USAGE_COOKIE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as UsageCookie
      return parsed
    } catch {}
  }
  return { count: 0, lastReset: Date.now() }
}

function saveUsage(usage: UsageCookie) {
  Cookies.set(USAGE_COOKIE_KEY, JSON.stringify(usage), { expires: 2 })
}

export const useUsageStore = create<UsageStore>((set, get) => {
  const usage = getInitialUsage()
  const now = Date.now()
  let count = usage.count
  let lastReset = usage.lastReset
  let disabled = false
  let resetTime = lastReset + USAGE_WINDOW_HOURS * 60 * 60 * 1000

  if (now > resetTime) {
    count = 0
    lastReset = now
    resetTime = lastReset + USAGE_WINDOW_HOURS * 60 * 60 * 1000
    saveUsage({ count, lastReset })
  }
  if (count >= USAGE_LIMIT) disabled = true

  return {
    count,
    disabled,
    resetTime,
    increment: () => {
      const { disabled } = get()
      if (disabled) return
      const now = Date.now()
      let usage = getInitialUsage()
      if (now > usage.lastReset + USAGE_WINDOW_HOURS * 60 * 60 * 1000) {
        usage = { count: 0, lastReset: now }
      }
      usage.count += 1
      saveUsage(usage)
      set({
        count: usage.count,
        disabled: usage.count >= USAGE_LIMIT,
        resetTime: usage.lastReset + USAGE_WINDOW_HOURS * 60 * 60 * 1000
      })
    },
    reset: () => {
      const now = Date.now()
      saveUsage({ count: 0, lastReset: now })
      set({ count: 0, disabled: false, resetTime: now + USAGE_WINDOW_HOURS * 60 * 60 * 1000 })
    },
    sync: () => {
      const usage = getInitialUsage()
      const now = Date.now()
      let count = usage.count
      let lastReset = usage.lastReset
      let resetTime = lastReset + USAGE_WINDOW_HOURS * 60 * 60 * 1000
      if (now > resetTime) {
        count = 0
        lastReset = now
        resetTime = lastReset + USAGE_WINDOW_HOURS * 60 * 60 * 1000
        saveUsage({ count, lastReset })
      }
      set({
        count,
        disabled: count >= USAGE_LIMIT,
        resetTime
      })
    }
  }
})
