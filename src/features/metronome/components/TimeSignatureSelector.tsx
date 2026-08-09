import { strings } from '../../../shared/i18n/strings'
import styles from './TimeSignatureSelector.module.css'

const TIME_SIGNATURES = [2, 3, 4, 5, 6, 7]

type TimeSignatureSelectorProps = {
  beatsPerMeasure: number
  onChange: (beatsPerMeasure: number) => void
}

function TimeSignatureSelector({
  beatsPerMeasure,
  onChange,
}: TimeSignatureSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{strings.metronome.timeSignatureLabel}</p>
      <div className={styles.grid}>
        {TIME_SIGNATURES.map((beats) => (
          <button
            key={beats}
            type="button"
            className={`${styles.option} ${
              beatsPerMeasure === beats ? styles.optionActive : ''
            }`}
            onClick={() => onChange(beats)}
          >
            {beats}/4
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeSignatureSelector
