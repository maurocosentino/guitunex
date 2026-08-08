import { useState } from 'react'
import { resumeAudioContext } from '../../../shared/lib/audioContext'
import { useMicrophoneAccess } from '../hooks/useMicrophoneAccess'
import { useAudioLevel } from '../../../shared/hooks/useAudioLevel'
import { usePitchDetection } from '../hooks/usePitchDetection'
import { frequencyToNote } from '../services/frequencyToNote'
import {
  getStringsForInstrument,
  type Instrument,
} from '../services/tunings'
import Header from './Header'
import NoteDisplay from './NoteDisplay'
import TuningGauge from './TuningGauge'
import StringSelector from './StringSelector'
import StartListeningButton from './StartListeningButton'
import AudioInputSelector from './AudioInputSelector'
import AudioLevelMeter from '../../../shared/components/AudioLevelMeter'
import styles from './TunerPage.module.css'

function TunerPage() {
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [instrument, setInstrument] = useState<Instrument>('guitar')
  const { state, devices, selectedDeviceId, requestAccess } =
    useMicrophoneAccess()

  const stream = state.status === 'granted' ? state.stream : null
  const audioLevel = useAudioLevel(stream)
  const pitch = usePitchDetection(stream)
  const noteInfo = pitch !== null ? frequencyToNote(pitch) : null

  async function handleClick() {
    await resumeAudioContext()
    setIsAudioActive(true)
    await requestAccess()
  }

  return (
    <div className={styles.page}>
      <div className={styles.console}>
        <Header instrument={instrument} onInstrumentChange={setInstrument} />

        <NoteDisplay
          note={noteInfo?.note ?? null}
          octave={noteInfo?.octave ?? null}
          cents={noteInfo?.cents ?? null}
        />

        <TuningGauge
          cents={noteInfo?.cents ?? 0}
          hasSignal={noteInfo !== null}
        />

        <StringSelector strings={getStringsForInstrument(instrument)} />

        {state.status === 'pending' && (
          <p className={styles.status}>Esperando permiso del micrófono...</p>
        )}
        {state.status === 'denied' && (
          <p className={styles.status}>
            No pudimos acceder al micrófono: {state.error.message}
          </p>
        )}

        <AudioInputSelector
          devices={devices}
          selectedDeviceId={selectedDeviceId}
          onSelect={(deviceId) => requestAccess(deviceId)}
        />

        <AudioLevelMeter level={audioLevel} />

        <StartListeningButton onClick={handleClick} disabled={isAudioActive} />
      </div>
    </div>
  )
}

export default TunerPage
