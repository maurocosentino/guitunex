let audioContext: AudioContext | null = null

export function getAudioContext(): AudioContext {
  if (audioContext === null) {
    audioContext = new AudioContext()
  }

  return audioContext
}

export async function resumeAudioContext(): Promise<void> {
  const context = getAudioContext()

  if (context.state === 'suspended') {
    await context.resume()
  }
}
