import { useEffect, useRef, useState } from 'react'
import { getAudioContext } from '../lib/audioContext'
import { createAudioAnalyser } from '../lib/audioAnalyser'

export function useAudioLevel(stream: MediaStream | null): number {
  const [level, setLevel] = useState(0)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (stream === null) {
      setLevel(0)
      return
    }

    const audioContext = getAudioContext()
    const analyser = createAudioAnalyser(audioContext, stream)
    const dataArray = new Uint8Array(analyser.fftSize)

    function readLevel() {
      analyser.getByteTimeDomainData(dataArray)

      const sumOfSquares = dataArray.reduce((sum, value) => {
        const normalizedValue = (value - 128) / 128
        return sum + normalizedValue * normalizedValue
      }, 0)

      const rms = Math.sqrt(sumOfSquares / dataArray.length)
      setLevel(rms)

      animationFrameId.current = requestAnimationFrame(readLevel)
    }

    readLevel()

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [stream])

  return level
}
