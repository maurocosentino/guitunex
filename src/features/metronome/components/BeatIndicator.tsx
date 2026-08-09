import styles from './BeatIndicator.module.css'

type BeatIndicatorProps = {
  beatsPerMeasure: number
  currentBeat: number | null
}

function BeatIndicator({ beatsPerMeasure, currentBeat }: BeatIndicatorProps) {
  return (
    <div className={styles.dotsRow}>
      {Array.from({ length: beatsPerMeasure }, (_, index) => (
        <div
          key={index}
          className={`${styles.dot} ${
            currentBeat === index ? styles.dotActive : ''
          }`}
        />
      ))}
    </div>
  )
}

export default BeatIndicator
