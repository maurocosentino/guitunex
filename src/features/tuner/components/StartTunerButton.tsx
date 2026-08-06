import { useState } from 'react'
import { resumeAudioContext } from '../../../shared/lib/audioContext'

function StartTunerButton() {
  const [isAudioActive, setIsAudioActive] = useState(false)

  async function handleClick() {
    await resumeAudioContext()
    setIsAudioActive(true)
  }

  return (
    <button type="button" onClick={handleClick} disabled={isAudioActive}>
      {isAudioActive ? 'Audio activo' : 'Empezar a afinar'}
    </button>
  )
}

export default StartTunerButton
