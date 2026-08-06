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

function generateHarmonicWave(
  fundamentalFrequency: number,
  sampleRate: number,
  durationInSamples: number,
): Float32Array {
  const buffer = new Float32Array(durationInSamples)

  for (let i = 0; i < durationInSamples; i++) {
    const t = i / sampleRate
    const fundamental = Math.sin(2 * Math.PI * fundamentalFrequency * t)
    const secondHarmonic = 0.5 * Math.sin(2 * Math.PI * fundamentalFrequency * 2 * t)
    const thirdHarmonic = 0.25 * Math.sin(2 * Math.PI * fundamentalFrequency * 3 * t)

    buffer[i] = fundamental + secondHarmonic + thirdHarmonic
  }

  return buffer
}

function generateWhiteNoise(durationInSamples: number): Float32Array {
  const buffer = new Float32Array(durationInSamples)

  for (let i = 0; i < durationInSamples; i++) {
    buffer[i] = Math.random() * 2 - 1
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

  it('detects a low bass frequency (41Hz, low E on a 4-string bass)', () => {
    const sampleRate = 44100
    const buffer = generateSineWave(41, sampleRate, 4096)

    const result = detectPitch(buffer, sampleRate)

    expect(result).not.toBeNull()
    expect(result).toBeCloseTo(41, 0)
  })

  it('returns null for silence', () => {
    const sampleRate = 44100
    const buffer = new Float32Array(2048)

    const result = detectPitch(buffer, sampleRate)

    expect(result).toBeNull()
  })

  it('returns null for white noise', () => {
    const sampleRate = 44100
    const buffer = generateWhiteNoise(2048)

    const result = detectPitch(buffer, sampleRate)

    expect(result).toBeNull()
  })

  it('detects the fundamental frequency in a wave with harmonics', () => {
    const sampleRate = 44100
    const buffer = generateHarmonicWave(220, sampleRate, 2048)

    const result = detectPitch(buffer, sampleRate)

    expect(result).not.toBeNull()
    expect(result).toBeCloseTo(220, 0)
  })
})
