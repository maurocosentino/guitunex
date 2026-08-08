const LOOKAHEAD_MS = 25
const SCHEDULE_AHEAD_SECONDS = 0.1

export type MetronomeScheduler = {
  start: () => void
  stop: () => void
}

export function createMetronomeScheduler(
  audioContext: AudioContext,
  bpm: number,
  onTick: (time: number) => void,
): MetronomeScheduler {
  const secondsPerBeat = 60 / bpm

  let nextNoteTime = 0
  let timerId: ReturnType<typeof setInterval> | null = null

  function scheduleUpcomingTicks() {
    while (nextNoteTime < audioContext.currentTime + SCHEDULE_AHEAD_SECONDS) {
      onTick(nextNoteTime)
      nextNoteTime += secondsPerBeat
    }
  }

  function start() {
    nextNoteTime = audioContext.currentTime
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
