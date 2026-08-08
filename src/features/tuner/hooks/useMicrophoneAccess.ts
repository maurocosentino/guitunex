import { useCallback, useEffect, useRef, useState } from 'react'
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
  const currentStreamRef = useRef<MediaStream | null>(null)

  const requestAccess = useCallback(
    async (deviceId?: string) => {
      if (state.status === 'granted') {
        state.stream.getTracks().forEach((track) => track.stop())
      }

      setState({ status: 'pending' })

      try {
        const stream = await requestMicrophoneAccess(deviceId)
        currentStreamRef.current = stream
        setState({ status: 'granted', stream })

        const availableDevices = await listAudioInputDevices()
        setDevices(availableDevices)
        setSelectedDeviceId(deviceId ?? availableDevices[0]?.deviceId ?? null)
      } catch (error) {
        setState({ status: 'denied', error: error as Error })
      }
    },
    [state],
  )

  const stopAccess = useCallback(() => {
    if (state.status === 'granted') {
      state.stream.getTracks().forEach((track) => track.stop())
    }

    currentStreamRef.current = null
    setState({ status: 'idle' })
  }, [state])

  useEffect(() => {
    if (state.status !== 'granted') {
      return
    }

    const handleTrackEnded = async () => {
      setState({
        status: 'denied',
        error: new Error('El dispositivo de audio se desconectó'),
      })

      const availableDevices = await listAudioInputDevices()
      setDevices(availableDevices)
      setSelectedDeviceId(null)
    }

    const tracks = state.stream.getTracks()
    tracks.forEach((track) => track.addEventListener('ended', handleTrackEnded))

    return () => {
      tracks.forEach((track) =>
        track.removeEventListener('ended', handleTrackEnded),
      )
    }
  }, [state])

  useEffect(() => {
    return () => {
      if (currentStreamRef.current !== null) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return { state, devices, selectedDeviceId, requestAccess, stopAccess }
}
