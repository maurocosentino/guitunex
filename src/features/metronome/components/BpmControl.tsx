import { strings } from '../../../shared/i18n/strings'
import styles from './BpmControl.module.css'

const MIN_BPM = 40
const MAX_BPM = 240

type BpmControlProps = {
  bpm: number
  onChange: (bpm: number) => void
}

function BpmControl({ bpm, onChange }: BpmControlProps) {
  function clampBpm(value: number): number {
    return Math.min(MAX_BPM, Math.max(MIN_BPM, value))
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{strings.metronome.tempoLabel}</p>

      <div className={styles.row}>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => onChange(clampBpm(bpm - 1))}
        >
          −
        </button>
        <span className={styles.value}>{bpm}</span>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => onChange(clampBpm(bpm + 1))}
        >
          +
        </button>
      </div>

      <input
        className={styles.slider}
        type="range"
        min={MIN_BPM}
        max={MAX_BPM}
        value={bpm}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  )
}

export default BpmControl
