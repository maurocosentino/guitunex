import type { TuningString } from '../services/tunings'
import styles from './StringSelector.module.css'

type StringSelectorProps = {
  strings: TuningString[]
}

function StringSelector({ strings }: StringSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>STRINGS</p>
      <div className={styles.grid}>
        {strings.map((string) => (
          <button
            key={string.label}
            type="button"
            className={styles.string}
          >
            <span className={styles.stringLabel}>{string.label}</span>
            <span className={styles.stringFrequency}>
              {string.frequency.toFixed(2)} Hz
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StringSelector
