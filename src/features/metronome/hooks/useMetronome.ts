import { useEffect, useRef, useState } from 'react'
import { getAudioContext, resumeAudioContext } from '../../../shared/lib/audioContext'
import {
  createMetronomeScheduler,
  type MetronomeScheduler,
  type TickInfo,
} from '../services/metronomeScheduler'
import { playClickSound } from '../services/playClickSound'

export function useMetronome(initialBpm = 120) {
  const [bpm, setBpm] = useState(initialBpm)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
  const [subdivision, setSubdivision] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTick, setCurrentTick] = useState<TickInfo | null>(null)

  const schedulerRef = useRef<MetronomeScheduler | null>(null)
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const audioContext = getAudioContext()

    const scheduler = createMetronomeScheduler(
      audioContext,
      bpm,
      beatsPerMeasure,
      subdivision,
      (time, tickInfo) => {
        playClickSound(audioContext, time, { isAccent: tickInfo.isAccent })

        const delayMs = Math.max(0, (time - audioContext.currentTime) * 1000)
        const timeoutId = setTimeout(() => {
          setCurrentTick(tickInfo)
        }, delayMs)

        timeoutIdsRef.current.push(timeoutId)
      },
    )

    schedulerRef.current = scheduler
    scheduler.start()

    return () => {
      scheduler.stop()
      schedulerRef.current = null
      timeoutIdsRef.current.forEach((id) => clearTimeout(id))
      timeoutIdsRef.current = []
      setCurrentTick(null)
    }
  }, [isPlaying, bpm, beatsPerMeasure, subdivision])

  async function play() {
    await resumeAudioContext()
    setIsPlaying(true)
  }

  function pause() {
    setIsPlaying(false)
  }

  return {
    bpm,
    setBpm,
    beatsPerMeasure,
    setBeatsPerMeasure,
    subdivision,
    setSubdivision,
    isPlaying,
    currentTick,
    play,
    pause,
  }
}
