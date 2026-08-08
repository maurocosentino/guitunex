import { useEffect, useRef, useState } from 'react'
import { getAudioContext } from '../../../shared/lib/audioContext'
import { resumeAudioContext } from '../../../shared/lib/audioContext'
import { createMetronomeScheduler } from '../services/metronomeScheduler'
import { playClickSound } from '../services/playClickSound'
import type { MetronomeScheduler } from '../services/metronomeScheduler'

export function useMetronome(initialBpm = 120) {
  const [bpm, setBpm] = useState(initialBpm)
  const [isPlaying, setIsPlaying] = useState(false)
  const schedulerRef = useRef<MetronomeScheduler | null>(null)

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const audioContext = getAudioContext()
    const scheduler = createMetronomeScheduler(audioContext, bpm, (time) => {
      playClickSound(audioContext, time)
    })

    schedulerRef.current = scheduler
    scheduler.start()

    return () => {
      scheduler.stop()
      schedulerRef.current = null
    }
  }, [isPlaying, bpm])

  async function play() {
    await resumeAudioContext()
    setIsPlaying(true)
  }

  function pause() {
    setIsPlaying(false)
  }

  return { bpm, setBpm, isPlaying, play, pause }
}
