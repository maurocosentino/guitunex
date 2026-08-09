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
    <div className={styles.group}>
      <p className={styles.groupLabel}>{strings.metronome.timeSignatureLabel}</p>
      <div className={styles.optionGrid}>
        {TIME_SIGNATURES.map((beats) => (
          <button
            key={beats}
            type="button"
            className={`${styles.optionButton} ${
              beatsPerMeasure === beats ? styles.optionButtonActive : ''
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
