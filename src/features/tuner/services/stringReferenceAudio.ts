import type { Instrument } from './tunings'

type AudioFileMap = Record<string, string>

const AUDIO_FILES: Partial<Record<Instrument, Record<string, AudioFileMap>>> = {
  guitar: {
    standard: {
      E2: 'E1.mp3',
      A2: 'A1.mp3',
      D3: 'D2.mp3',
      G3: 'G2.mp3',
      B3: 'B2.mp3',
      E4: 'E3.mp3',
    },
    'drop-d': {
      D2: 'D1.mp3',
      A2: 'A1.mp3',
      D3: 'D2.mp3',
      G3: 'G2.mp3',
      B3: 'B2.mp3',
      E4: 'E3.mp3',
    },
    'eb-standard': {
      Eb2: 'Eb1.mp3',
      Ab2: 'Ab1.mp3',
      Db3: 'Db2.mp3',
      Gb3: 'Gb2.mp3',
      Bb3: 'Bb2.mp3',
      Eb4: 'Eb3.mp3',
    },
  },
  bass: {
    standard: {
      E1: 'E0.mp3',
      A1: 'A0.mp3',
      D2: 'D1.mp3',
      G2: 'G1.mp3',
    },
  },
}

const AUDIO_BASE_PATH: Partial<Record<Instrument, Record<string, string>>> = {
  guitar: {
    standard: '/audio/guitar/standard',
    'drop-d': '/audio/guitar/drop-d',
    'eb-standard': '/audio/guitar/eb-standard',
  },
  bass: {
    standard: '/audio/bass/standard',
  },
}

export function getStringAudioUrl(
  instrument: Instrument,
  tuningId: string,
  stringLabel: string,
): string | null {
  const basePath = AUDIO_BASE_PATH[instrument]?.[tuningId]
  const fileName = AUDIO_FILES[instrument]?.[tuningId]?.[stringLabel]

  if (basePath === undefined || fileName === undefined) {
    return null
  }

  return `${basePath}/${fileName}`
}
