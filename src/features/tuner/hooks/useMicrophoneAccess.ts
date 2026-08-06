import { useCallback, useState } from 'react'
import { requestMicrophoneAccess } from '../services/microphoneAccess'
import {
  listAudioInputDevices,
  type AudioInputDevice,
} from '../services/audioDevices'

type MicrophoneAccessState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'granted'; stream: MediaStream }
  | { status: 'denied'; error: Error }

export function useMicrophoneAccess() {
  const [state, setState] = useState<MicrophoneAccessState>({ status: 'idle' })
  const [devices, setDevices] = useState<AudioInputDevice[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)

  const requestAccess = useCallback(async (deviceId?: string) => {
    setState({ status: 'pending' })

    try {
      const stream = await requestMicrophoneAccess(deviceId)
      setState({ status: 'granted', stream })

      const availableDevices = await listAudioInputDevices()
      setDevices(availableDevices)
      setSelectedDeviceId(deviceId ?? availableDevices[0]?.deviceId ?? null)
    } catch (error) {
      setState({ status: 'denied', error: error as Error })
    }
  }, [])

  return { state, devices, selectedDeviceId, requestAccess }
}
