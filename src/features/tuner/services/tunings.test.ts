import { describe, expect, it } from 'vitest'
import { getTuningsForInstrument, getDefaultTuning } from './tunings'

describe('tunings', () => {
  it('returns at least one tuning per instrument', () => {
    expect(getTuningsForInstrument('guitar').length).toBeGreaterThan(0)
    expect(getTuningsForInstrument('bass').length).toBeGreaterThan(0)
  })

  it('returns Standard as the default tuning', () => {
    expect(getDefaultTuning('guitar').id).toBe('standard')
    expect(getDefaultTuning('bass').id).toBe('standard')
  })

  it('has 6 strings for every guitar tuning', () => {
    const guitarTunings = getTuningsForInstrument('guitar')

    guitarTunings.forEach((tuning) => {
      expect(tuning.strings).toHaveLength(6)
    })
  })

  it('has 4 strings for every bass tuning', () => {
    const bassTunings = getTuningsForInstrument('bass')

    bassTunings.forEach((tuning) => {
      expect(tuning.strings).toHaveLength(4)
    })
  })

  it('tunes Eb Standard exactly one semitone below Standard', () => {
    const standard = getTuningsForInstrument('guitar').find(
      (tuning) => tuning.id === 'standard',
    )
    const ebStandard = getTuningsForInstrument('guitar').find(
      (tuning) => tuning.id === 'eb-standard',
    )

    standard?.strings.forEach((string, index) => {
      const ebString = ebStandard?.strings[index]
      const semitoneRatio = 2 ** (1 / 12)

      expect(ebString?.frequency).toBeCloseTo(
        string.frequency / semitoneRatio,
        1,
      )
    })
  })

  it('tunes Drop D by lowering only the lowest string a whole tone', () => {
    const standard = getTuningsForInstrument('guitar').find(
      (tuning) => tuning.id === 'standard',
    )
    const dropD = getTuningsForInstrument('guitar').find(
      (tuning) => tuning.id === 'drop-d',
    )

    expect(dropD?.strings[0].frequency).toBeLessThan(
      standard?.strings[0].frequency ?? 0,
    )

    standard?.strings.slice(1).forEach((string, index) => {
      expect(dropD?.strings[index + 1].frequency).toBe(string.frequency)
    })
  })
})
