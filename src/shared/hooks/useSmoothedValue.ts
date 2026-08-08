import { useEffect, useRef, useState } from 'react'

export function useSmoothedValue(
  value: number | null,
  windowSize = 5,
): number | null {
  const historyRef = useRef<number[]>([])
  const [smoothedValue, setSmoothedValue] = useState<number | null>(null)

  useEffect(() => {
    if (value === null) {
      historyRef.current = []
      setSmoothedValue(null)
      return
    }

    historyRef.current = [...historyRef.current, value].slice(-windowSize)

    const average =
      historyRef.current.reduce((sum, entry) => sum + entry, 0) /
      historyRef.current.length

    setSmoothedValue(average)
  }, [value, windowSize])

  return smoothedValue
}
