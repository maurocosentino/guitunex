import { describe, expect, it } from 'vitest'
import { detectPitch } from './pitchDetection'

function generateSineWave(
  frequency: number,
  sampleRate: number,
  durationInSamples: number,
): Float32Array {
  const buffer = new Float32Array(durationInSamples)

  for (let i = 0; i < durationInSamples; i++) {
    buffer[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate)
  }

  return buffer
}

describe('detectPitch', () => {
  it('detects a pure 440Hz sine wave', () => {
    const sampleRate = 44100
    const buffer = generateSineWave(440, sampleRate, 2048)

    const result = detectPitch(buffer, sampleRate)

    expect(result).not.toBeNull()
    expect(result).toBeCloseTo(440, 0)
  })
})
