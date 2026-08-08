export function playClickSound(audioContext: AudioContext, time: number) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.frequency.value = 1000
  gainNode.gain.setValueAtTime(0.3, time)
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start(time)
  oscillator.stop(time + 0.05)
}
