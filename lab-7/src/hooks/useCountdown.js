import { useEffect, useState } from 'react'
/**
 * Зворотний відлік від `totalSeconds` до нуля, по секунді.
 *
 * Використання:
 *   const { secondsLeft, isRunning, start, pause, reset } = useCountdown(180)
 *
 * Вимоги — у тестах tests/useCountdown.test.jsx.
 */
export function useCountdown(totalSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [active, setActive] = useState(false)

  const isRunning = active && secondsLeft > 0

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) =>
        prevSecondsLeft > 0 ? prevSecondsLeft - 1 : 0,
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  return {
    secondsLeft: secondsLeft,
    isRunning: isRunning,
    start() {
      if (secondsLeft > 0) {
        setActive(true)
      }
    },
    pause() {
      setActive(false)
    },
    reset() {
      setSecondsLeft(totalSeconds)
      setActive(false)
    },
  }
}
