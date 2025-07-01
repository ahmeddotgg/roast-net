import { useEffect, useState } from "react"

export const useCountdown = (targetTime: number | null) => {
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    if (targetTime === null) {
      setRemainingTime(0)
      return
    }

    const calculateRemaining = () => {
      const now = Date.now()
      const diff = targetTime - now
      return Math.max(0, diff) 
    }

    setRemainingTime(calculateRemaining())

    const intervalId = setInterval(() => {
      const newRemaining = calculateRemaining()
      setRemainingTime(newRemaining)

      if (newRemaining === 0) {
        clearInterval(intervalId)
      }
    }, 1000) 

    return () => clearInterval(intervalId)
  }, [targetTime])

  return remainingTime
}

export const formatTime = (ms: number) => {
  const totalSeconds = Math.ceil(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}
