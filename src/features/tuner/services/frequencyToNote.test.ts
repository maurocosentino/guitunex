import { describe, expect, it } from 'vitest'
import { frequencyToNote } from './frequencyToNote'

describe('frequencyToNote', () => {
  it('identifies A4 (440Hz) as perfectly in tune', () => {
    const result = frequencyToNote(440)

    expect(result.note).toBe('A')
    expect(result.octave).toBe(4)
    expect(result.cents).toBe(0)
  })

  it('identifies E2 (82.41Hz, low E on guitar) as perfectly in tune', () => {
    const result = frequencyToNote(82.41)

    expect(result.note).toBe('E')
    expect(result.octave).toBe(2)
    expect(result.cents).toBeCloseTo(0, 0)
  })

  it('detects a sharp deviation for a slightly high frequency', () => {
    const result = frequencyToNote(445)

    expect(result.note).toBe('A')
    expect(result.octave).toBe(4)
    expect(result.cents).toBeGreaterThan(0)
  })

  it('correctly identifies a sharp note (C#4)', () => {
    const result = frequencyToNote(277.18)

    expect(result.note).toBe('C#')
    expect(result.octave).toBe(4)
    expect(result.cents).toBeCloseTo(0, 0)
  })
})
