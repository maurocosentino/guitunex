export function createAudioAnalyser(
  audioContext: AudioContext,
  stream: MediaStream,
  fftSize = 2048,
): AnalyserNode {
  const sourceNode = audioContext.createMediaStreamSource(stream)
  const analyserNode = audioContext.createAnalyser()
  analyserNode.fftSize = fftSize

  sourceNode.connect(analyserNode)

  return analyserNode
}
