type PlayClickSoundOptions = {
  isAccent?: boolean
}

export function playClickSound(
  audioContext: AudioContext,
  time: number,
  options: PlayClickSoundOptions = {},
) {
  const { isAccent = false } = options

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.frequency.value = isAccent ? 1500 : 1000
  gainNode.gain.setValueAtTime(isAccent ? 0.4 : 0.25, time)
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start(time)
  oscillator.stop(time + 0.05)
}
