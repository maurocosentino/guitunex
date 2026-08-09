import styles from './TuningGauge.module.css'

type TuningGaugeProps = {
  cents: number
  hasSignal: boolean
}

const TICK_COUNT = 31
const CENTER_INDEX = Math.floor(TICK_COUNT / 2)

function getActiveTickIndex(cents: number): number {
  const clampedCents = Math.max(-50, Math.min(50, cents))
  const ratio = (clampedCents + 50) / 100
  return Math.round(ratio * (TICK_COUNT - 1))
}

function getAccuracyClass(cents: number): string {
  const absoluteCents = Math.abs(cents)

  if (absoluteCents <= 5) {
    return styles.tickActiveInTune
  }

  if (absoluteCents <= 20) {
    return styles.tickActiveClose
  }

  return styles.tickActiveOff
}

function TuningGauge({ cents, hasSignal }: TuningGaugeProps) {
  const activeIndex = hasSignal ? getActiveTickIndex(cents) : null
  const accuracyClass = hasSignal ? getAccuracyClass(cents) : ''

  return (
    <div className={styles.card}>
      <div className={styles.labelsRow}>
        <span>-50</span>
        <span>0</span>
        <span>+50</span>
      </div>

      <div className={styles.tickStrip}>
        {Array.from({ length: TICK_COUNT }, (_, index) => {
          const isCenter = index === CENTER_INDEX
          const isActive = index === activeIndex

          return (
            <div
              key={index}
              className={`${styles.tick} ${
                isCenter ? styles.tickCenter : ''
              } ${isActive ? `${styles.tickActive} ${accuracyClass}` : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TuningGauge
