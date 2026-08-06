import { useState } from 'react'
import { resumeAudioContext } from '../../../shared/lib/audioContext'
import { useMicrophoneAccess } from '../hooks/useMicrophoneAccess'
import AudioInputSelector from './AudioInputSelector'

function StartTunerButton() {
  const [isAudioActive, setIsAudioActive] = useState(false)
  const { state, devices, selectedDeviceId, requestAccess } =
    useMicrophoneAccess()

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
    </div>
  )
}

export default StartTunerButton
