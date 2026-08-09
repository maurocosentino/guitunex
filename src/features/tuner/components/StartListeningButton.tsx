import { strings } from '../../../shared/i18n/strings'
import styles from './StartListeningButton.module.css'

type StartListeningButtonProps = {
  isListening: boolean
  onStart: () => void
  onStop: () => void
}

function StartListeningButton({
  isListening,
  onStart,
  onStop,
}: StartListeningButtonProps) {
  if (isListening) {
    return (
      <button
        type="button"
        className={`${styles.button} ${styles.stop}`}
        onClick={onStop}
      >
        {strings.tuner.stopListening}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${styles.start}`}
      onClick={onStart}
    >
      {strings.tuner.startListening}
    </button>
  )
}

export default StartListeningButton
