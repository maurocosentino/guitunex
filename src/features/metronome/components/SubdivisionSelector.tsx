import { strings } from '../../../shared/i18n/strings'
import styles from './SubdivisionSelector.module.css'

const SUBDIVISIONS = [
  { value: 1, label: strings.metronome.subdivisionQuarter },
  { value: 2, label: strings.metronome.subdivisionEighth },
  { value: 3, label: strings.metronome.subdivisionTriplet },
  { value: 4, label: strings.metronome.subdivisionSixteenth },
]

type SubdivisionSelectorProps = {
  subdivision: number
  onChange: (subdivision: number) => void
}

function SubdivisionSelector({
  subdivision,
  onChange,
}: SubdivisionSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{strings.metronome.subdivisionLabel}</p>
      <div className={styles.grid}>
        {SUBDIVISIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.option} ${
              subdivision === option.value ? styles.optionActive : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SubdivisionSelector
