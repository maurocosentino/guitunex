export type Instrument = 'guitar' | 'bass'

export type TuningString = {
  label: string
  frequency: number
}

export type Tuning = {
  id: string
  name: string
  strings: TuningString[]
}

const TUNINGS: Record<Instrument, Tuning[]> = {
  guitar: [
    {
      id: 'standard',
      name: 'Standard',
      strings: [
        { label: 'E2', frequency: 82.41 },
        { label: 'A2', frequency: 110.0 },
        { label: 'D3', frequency: 146.83 },
        { label: 'G3', frequency: 196.0 },
        { label: 'B3', frequency: 246.94 },
        { label: 'E4', frequency: 329.63 },
      ],
    },
    {
      id: 'drop-d',
      name: 'Drop D',
      strings: [
        { label: 'D2', frequency: 73.42 },
        { label: 'A2', frequency: 110.0 },
        { label: 'D3', frequency: 146.83 },
        { label: 'G3', frequency: 196.0 },
        { label: 'B3', frequency: 246.94 },
        { label: 'E4', frequency: 329.63 },
      ],
    },
    {
      id: 'eb-standard',
      name: 'Eb Standard',
      strings: [
        { label: 'Eb2', frequency: 77.78 },
        { label: 'Ab2', frequency: 103.83 },
        { label: 'Db3', frequency: 138.59 },
        { label: 'Gb3', frequency: 185.0 },
        { label: 'Bb3', frequency: 233.08 },
        { label: 'Eb4', frequency: 311.13 },
      ],
    },
  ],
  bass: [
    {
      id: 'standard',
      name: 'Standard',
      strings: [
        { label: 'E1', frequency: 41.2 },
        { label: 'A1', frequency: 55.0 },
        { label: 'D2', frequency: 73.42 },
        { label: 'G2', frequency: 98.0 },
      ],
    },
    {
      id: 'drop-d',
      name: 'Drop D',
      strings: [
        { label: 'D1', frequency: 36.71 },
        { label: 'A1', frequency: 55.0 },
        { label: 'D2', frequency: 73.42 },
        { label: 'G2', frequency: 98.0 },
      ],
    },
    {
      id: 'eb-standard',
      name: 'Eb Standard',
      strings: [
        { label: 'Eb1', frequency: 38.89 },
        { label: 'Ab1', frequency: 51.91 },
        { label: 'Db2', frequency: 69.3 },
        { label: 'Gb2', frequency: 92.5 },
      ],
    },
  ],
}

export function getTuningsForInstrument(instrument: Instrument): Tuning[] {
  return TUNINGS[instrument]
}

export function getDefaultTuning(instrument: Instrument): Tuning {
  return TUNINGS[instrument][0]
}
