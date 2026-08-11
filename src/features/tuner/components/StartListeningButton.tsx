import { strings } from '../../../shared/i18n/strings'
import AudioLevelMeter from '../../../shared/components/AudioLevelMeter'
import styles from './StartListeningButton.module.css'

type StartListeningButtonProps = {
  isListening: boolean
  audioLevel: number
  onStart: () => void
  onStop: () => void
}

function StartListeningButton({
  isListening,
  audioLevel,
  onStart,
  onStop,
}: StartListeningButtonProps) {
  if (isListening) {
    return (
      <button
        type="button"
        className={`${styles.button} ${styles.stopButton}`}
        onClick={onStop}
      >
        <span className={styles.text}>{strings.tuner.stopListening}</span>
        <span className={styles.meter}>
          <AudioLevelMeter level={audioLevel} />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${styles.startButton}`}
      onClick={onStart}
    >
      <span className={styles.text}>{strings.tuner.startListening}</span>
      <span className={styles.meter}>
        <AudioLevelMeter level={0} />
      </span>
    </button>
  )
}

export default StartListeningButton
