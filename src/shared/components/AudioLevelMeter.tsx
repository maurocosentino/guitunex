import { strings } from '../i18n/strings'
import styles from './AudioLevelMeter.module.css'

type AudioLevelMeterProps = {
  level: number
}

function AudioLevelMeter({ level }: AudioLevelMeterProps) {
  const clampedLevel = Math.min(level, 1)
  const widthPercentage = clampedLevel * 100

  return (
    <div
      role="meter"
      aria-label={strings.tuner.audioLevelAriaLabel}
      aria-valuenow={Math.round(widthPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={styles.track}
    >
      <div className={styles.fill} style={{ width: `${widthPercentage}%` }} />
    </div>
  )
}

export default AudioLevelMeter
