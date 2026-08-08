const LOOKAHEAD_MS = 25
const SCHEDULE_AHEAD_SECONDS = 0.1

export type TickInfo = {
  beatIndex: number
  subdivisionIndex: number
  isAccent: boolean
}

export type MetronomeScheduler = {
  start: () => void
  stop: () => void
}

export function createMetronomeScheduler(
  audioContext: AudioContext,
  bpm: number,
  beatsPerMeasure: number,
  subdivision: number,
  onTick: (time: number, tickInfo: TickInfo) => void,
): MetronomeScheduler {
  const secondsPerBeat = 60 / bpm
  const secondsPerTick = secondsPerBeat / subdivision

  let nextNoteTime = 0
  let tickCounter = 0
  let timerId: ReturnType<typeof setInterval> | null = null

  function scheduleUpcomingTicks() {
    while (nextNoteTime < audioContext.currentTime + SCHEDULE_AHEAD_SECONDS) {
      const beatIndex = Math.floor(tickCounter / subdivision) % beatsPerMeasure
      const subdivisionIndex = tickCounter % subdivision
      const isAccent = beatIndex === 0 && subdivisionIndex === 0

      onTick(nextNoteTime, { beatIndex, subdivisionIndex, isAccent })

      tickCounter += 1
      nextNoteTime += secondsPerTick
    }
  }

  function start() {
    nextNoteTime = audioContext.currentTime
    tickCounter = 0
    timerId = setInterval(scheduleUpcomingTicks, LOOKAHEAD_MS)
  }

  function stop() {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
  }

  return { start, stop }
}
