import { useEffect, useRef, useState } from 'react'

const REPEAT_INTERVAL_MS = 4000

export function useStringReferencePlayer() {
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false)
  const [playingUrl, setPlayingUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function playUrl(url: string) {
    if (audioRef.current !== null) {
      audioRef.current.pause()
    }

    const audio = new Audio(url)
    audioRef.current = audio
    audio.play()
    setPlayingUrl(url)
  }

  useEffect(() => {
    if (!isRepeatEnabled || playingUrl === null) {
      return
    }

    intervalRef.current = setInterval(() => {
      playUrl(playingUrl)
    }, REPEAT_INTERVAL_MS)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRepeatEnabled, playingUrl])

  useEffect(() => {
    return () => {
      if (audioRef.current !== null) {
        audioRef.current.pause()
      }
    }
  }, [])

  function toggleRepeat() {
    setIsRepeatEnabled((current) => !current)
  }

  return { playUrl, playingUrl, isRepeatEnabled, toggleRepeat }
}
