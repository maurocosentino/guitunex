export type Instrument = 'guitar' | 'ukulele'

export type TuningString = {
  label: string
  frequency: number
}

const TUNINGS: Record<Instrument, TuningString[]> = {
  guitar: [
    { label: 'E2', frequency: 82.41 },
    { label: 'A2', frequency: 110.0 },
    { label: 'D3', frequency: 146.83 },
    { label: 'G3', frequency: 196.0 },
    { label: 'B3', frequency: 246.94 },
    { label: 'E4', frequency: 329.63 },
  ],
  ukulele: [
    { label: 'G4', frequency: 392.0 },
    { label: 'C4', frequency: 261.63 },
    { label: 'E4', frequency: 329.63 },
    { label: 'A4', frequency: 440.0 },
  ],
}

export function getStringsForInstrument(
  instrument: Instrument,
): TuningString[] {
  return TUNINGS[instrument]
}
