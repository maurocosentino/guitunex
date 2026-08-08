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
        STOP
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${styles.start}`}
      onClick={onStart}
    >
      START LISTENING
    </button>
  )
}

export default StartListeningButton
