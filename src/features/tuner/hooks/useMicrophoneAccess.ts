import { useCallback, useState } from 'react'
import { requestMicrophoneAccess } from '../services/microphoneAccess'

type MicrophoneAccessState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'granted'; stream: MediaStream }
  | { status: 'denied'; error: Error }

export function useMicrophoneAccess() {
  const [state, setState] = useState<MicrophoneAccessState>({ status: 'idle' })

  const requestAccess = useCallback(async () => {
    setState({ status: 'pending' })

    try {
      const stream = await requestMicrophoneAccess()
      setState({ status: 'granted', stream })
    } catch (error) {
      setState({ status: 'denied', error: error as Error })
    }
  }, [])

  return { state, requestAccess }
}
