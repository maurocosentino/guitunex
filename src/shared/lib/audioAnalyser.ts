export function createAudioAnalyser(
  audioContext: AudioContext,
  stream: MediaStream,
): AnalyserNode {
  const sourceNode = audioContext.createMediaStreamSource(stream)
  const analyserNode = audioContext.createAnalyser()

  sourceNode.connect(analyserNode)

  return analyserNode
}
