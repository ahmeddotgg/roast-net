import { MAX_USES, useAppLimitStore } from "@/modules/app-limit/store"
import { useEffect, useState } from "react"

export function useAppLimitFeedback() {
  const { count, cooldownEndTimestamp } = useAppLimitStore()
  const [remaining, setRemaining] = useState<number | null>(null)

  const isAllowed = count < MAX_USES && !cooldownEndTimestamp

  useEffect(() => {
    if (!cooldownEndTimestamp) {
      setRemaining(null)
      return
    }
    const updateRemaining = () => {
      const now = Date.now()
      const newRemaining = cooldownEndTimestamp - now
      setRemaining(newRemaining > 0 ? newRemaining : null)
    }
    updateRemaining()
    const interval = setInterval(updateRemaining, 1000)
    return () => clearInterval(interval)
  }, [cooldownEndTimestamp])

  return {
    remaining,
    isAllowed,
    remainingUses: Math.max(0, MAX_USES - count),
    count,
    cooldownEndTimestamp
  }
}
