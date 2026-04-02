import { useState, useEffect } from 'react'

const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const remSeconds = timeInSeconds % 60

    return `${minutes}:${remSeconds.toString().padStart(2, '0')}s`
  }

  return {
    formattedTime: formatTime(seconds),
    seconds,
  }
}

export default useCountdown
