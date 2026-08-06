const A4_FREQUENCY = 440

function frequencyToSemitonesFromA4(frequency: number): number {
  return 12 * Math.log2(frequency / A4_FREQUENCY)
}

const NOTE_NAMES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
] as const

type NoteName = (typeof NOTE_NAMES)[number]

function semitonesToNoteAndOctave(
  semitonesFromA4: number,
): { note: NoteName; octave: number } {
  const semitonesFromC0 = semitonesFromA4 + 9 + 12 * 4

  const noteIndex = ((semitonesFromC0 % 12) + 12) % 12
  const octave = Math.floor(semitonesFromC0 / 12)

  return { note: NOTE_NAMES[noteIndex], octave }
}

function calculateCentsDeviation(semitonesFromA4: number): number {
  const nearestSemitone = Math.round(semitonesFromA4)
  const deviation = semitonesFromA4 - nearestSemitone

  return Math.round(deviation * 100)
}

export type NoteInfo = {
  note: NoteName
  octave: number
  cents: number
}

export function frequencyToNote(frequency: number): NoteInfo {
  const semitonesFromA4 = frequencyToSemitonesFromA4(frequency)
  const roundedSemitones = Math.round(semitonesFromA4)

  const { note, octave } = semitonesToNoteAndOctave(roundedSemitones)
  const cents = calculateCentsDeviation(semitonesFromA4)

  return { note, octave, cents }
}
