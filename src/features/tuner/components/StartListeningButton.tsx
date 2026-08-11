import { strings } from '../../../shared/i18n/strings'
import AudioLevelMeter from '../../../shared/components/AudioLevelMeter'
import PressButton from '../../../shared/components/PressButton'
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
      <PressButton onClick={onStop} variant="danger">
        <div className={styles.content}>
          <span className={styles.text}>{strings.tuner.stopListening}</span>
          <span className={styles.meter}>
            <AudioLevelMeter level={audioLevel} />
          </span>
        </div>
      </PressButton>
    )
  }

  return (
    <PressButton onClick={onStart} variant="accent">
      <div className={styles.content}>
        <span className={styles.text}>{strings.tuner.startListening}</span>
        <span className={styles.meter}>
          <AudioLevelMeter level={0} />
        </span>
      </div>
    </PressButton>
  )
}

export default StartListeningButton
