import { useEffect, useState } from "react"

export function useCountUp (end, duration = 800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!end) return

    let start = 0
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return count
}