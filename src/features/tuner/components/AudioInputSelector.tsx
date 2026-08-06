import type { AudioInputDevice } from '../services/audioDevices'

type AudioInputSelectorProps = {
  devices: AudioInputDevice[]
  selectedDeviceId: string | null
  onSelect: (deviceId: string) => void
}

function AudioInputSelector({
  devices,
  selectedDeviceId,
  onSelect,
}: AudioInputSelectorProps) {
  if (devices.length === 0) {
    return null
  }

  return (
    <label>
      Entrada de audio
      <select
        value={selectedDeviceId ?? ''}
        onChange={(event) => onSelect(event.target.value)}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || 'Micrófono sin nombre'}
          </option>
        ))}
      </select>
    </label>
  )
}

export default AudioInputSelector
