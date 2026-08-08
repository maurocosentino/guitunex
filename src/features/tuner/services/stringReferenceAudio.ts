import type { Instrument } from './tunings'

const AUDIO_BASE_PATH: Partial<Record<Instrument, Record<string, string>>> = {
  guitar: {
    standard: '/audio/guitar/standard',
  },
}

export function getStringAudioUrl(
  instrument: Instrument,
  tuningId: string,
  stringLabel: string,
): string | null {
  const basePath = AUDIO_BASE_PATH[instrument]?.[tuningId]

  if (basePath === undefined) {
    return null
  }

  return `${basePath}/${stringLabel.toLowerCase()}.mp3`
}
