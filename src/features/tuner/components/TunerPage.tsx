import { useState } from 'react'
import { resumeAudioContext } from '../../../shared/lib/audioContext'
import { isAudioSupported } from '../../../shared/lib/browserSupport'
import { useMicrophoneAccess } from '../hooks/useMicrophoneAccess'
import { useAudioLevel } from '../../../shared/hooks/useAudioLevel'
import { usePitchDetection } from '../hooks/usePitchDetection'
import { useSmoothedValue } from '../../../shared/hooks/useSmoothedValue'
import { frequencyToNote } from '../services/frequencyToNote'
import {
  getTuningsForInstrument,
  getDefaultTuning,
  type Instrument,
} from '../services/tunings'
import { strings } from '../../../shared/i18n/strings'
import InstrumentSelector from './InstrumentSelector'
import NoteDisplay from './NoteDisplay'
import TuningGauge from './TuningGauge'
import StringSelector from './StringSelector'
import StartListeningButton from './StartListeningButton'
import AudioInputSelector from './AudioInputSelector'
import UnsupportedBrowserMessage from './UnsupportedBrowserMessage'
import styles from './TunerPage.module.css'

function TunerPage() {
  const [instrument, setInstrument] = useState<Instrument>('guitar')
  const [selectedTuningId, setSelectedTuningId] = useState(
    getDefaultTuning('guitar').id,
  )
  const { state, devices, selectedDeviceId, requestAccess, stopAccess } =
    useMicrophoneAccess()

  const stream = state.status === 'granted' ? state.stream : null
  const audioLevel = useAudioLevel(stream)
  const rawPitch = usePitchDetection(stream)
  const pitch = useSmoothedValue(rawPitch)
  const noteInfo = pitch !== null ? frequencyToNote(pitch) : null

  const tunings = getTuningsForInstrument(instrument)
  const selectedTuning =
    tunings.find((tuning) => tuning.id === selectedTuningId) ?? tunings[0]

  function handleInstrumentChange(newInstrument: Instrument) {
    setInstrument(newInstrument)
    setSelectedTuningId(getDefaultTuning(newInstrument).id)
  }

  async function handleStart() {
    await resumeAudioContext()
    await requestAccess()
  }

  return (
    <>
      {isAudioSupported() ? (
        <>
          <NoteDisplay
            note={noteInfo?.note ?? null}
            octave={noteInfo?.octave ?? null}
            cents={noteInfo?.cents ?? null}
          />

          <TuningGauge
            cents={noteInfo?.cents ?? 0}
            hasSignal={noteInfo !== null}
          />

          <InstrumentSelector
            instrument={instrument}
            tunings={tunings}
            selectedTuningId={selectedTuning.id}
            onInstrumentChange={handleInstrumentChange}
            onTuningChange={setSelectedTuningId}
          />

          <StringSelector
            instrument={instrument}
            tuningId={selectedTuning.id}
            tuningStrings={selectedTuning.strings}
          />

          {state.status === 'pending' && (
            <p className={styles.status}>{strings.tuner.micPending}</p>
          )}
          {state.status === 'denied' && (
            <p className={styles.status}>
              {strings.tuner.micDenied} {state.error.message}
            </p>
          )}

          <AudioInputSelector
            devices={devices}
            selectedDeviceId={selectedDeviceId}
            onSelect={(deviceId) => requestAccess(deviceId)}
          />

          <div className={styles.buttonWrapper}>
            <StartListeningButton
              isListening={state.status === 'granted'}
              audioLevel={audioLevel}
              onStart={handleStart}
              onStop={stopAccess}
            />
          </div>
        </>
      ) : (
        <UnsupportedBrowserMessage />
      )}
    </>
  )
}

export default TunerPage
