import type { AudioInputDevice } from '../services/audioDevices'
import styles from './AudioInputSelector.module.css'

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
  const hasDevices = devices.length > 0

  return (
    <label className={styles.label}>
      Entrada de audio
      <select
        className={styles.select}
        value={selectedDeviceId ?? ''}
        onChange={(event) => onSelect(event.target.value)}
        disabled={!hasDevices}
      >
        {hasDevices ? (
          devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || 'Micrófono sin nombre'}
            </option>
          ))
        ) : (
          <option value="">Sin dispositivos disponibles</option>
        )}
      </select>
    </label>
  )
}

export default AudioInputSelector
