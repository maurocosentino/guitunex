import { useState } from 'react'
import { resumeAudioContext } from '../../../shared/lib/audioContext'
import { useMicrophoneAccess } from '../hooks/useMicrophoneAccess'
import { useAudioLevel } from '../../../shared/hooks/useAudioLevel'
import { usePitchDetection } from '../hooks/usePitchDetection'
import { frequencyToNote } from '../services/frequencyToNote'
import AudioInputSelector from './AudioInputSelector'
import AudioLevelMeter from '../../../shared/components/AudioLevelMeter'

function StartTunerButton() {
  const [isAudioActive, setIsAudioActive] = useState(false)
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
    <div>
      <button type="button" onClick={handleClick} disabled={isAudioActive}>
        {isAudioActive ? 'Audio activo' : 'Empezar a afinar'}
      </button>

      {state.status === 'pending' && <p>Esperando permiso del micrófono...</p>}
      {state.status === 'granted' && <p>Micrófono conectado ✅</p>}
      {state.status === 'denied' && (
        <p>No pudimos acceder al micrófono: {state.error.message}</p>
      )}

      <AudioInputSelector
        devices={devices}
        selectedDeviceId={selectedDeviceId}
        onSelect={(deviceId) => requestAccess(deviceId)}
      />

      <AudioLevelMeter level={audioLevel} />

      {noteInfo !== null && (
        <p>
          {noteInfo.note}
          {noteInfo.octave} ({noteInfo.cents > 0 ? '+' : ''}
          {noteInfo.cents} cents)
        </p>
      )}
    </div>
  )
}

export default StartTunerButton
