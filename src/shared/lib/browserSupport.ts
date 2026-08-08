export function isAudioSupported(): boolean {
  const hasGetUserMedia = Boolean(
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
  )
  const hasAudioContext = typeof AudioContext !== 'undefined'

  return hasGetUserMedia && hasAudioContext
}
