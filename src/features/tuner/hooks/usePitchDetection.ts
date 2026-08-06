import { useEffect, useRef, useState } from 'react'
import { getAudioContext } from '../../../shared/lib/audioContext'
import { createAudioAnalyser } from '../../../shared/lib/audioAnalyser'
import { detectPitch } from '../services/pitchDetection'

const PITCH_DETECTION_FFT_SIZE = 4096

export function usePitchDetection(stream: MediaStream | null): number | null {
  const [pitch, setPitch] = useState<number | null>(null)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (stream === null) {
      setPitch(null)
      return
    }

    const audioContext = getAudioContext()
    const analyser = createAudioAnalyser(
      audioContext,
      stream,
      PITCH_DETECTION_FFT_SIZE,
    )
    const buffer = new Float32Array(analyser.fftSize)

    function detectPitchLoop() {
      analyser.getFloatTimeDomainData(buffer)

      const detectedPitch = detectPitch(buffer, audioContext.sampleRate)
      setPitch(detectedPitch)

      animationFrameId.current = requestAnimationFrame(detectPitchLoop)
    }

    detectPitchLoop()

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [stream])

  return pitch
}
