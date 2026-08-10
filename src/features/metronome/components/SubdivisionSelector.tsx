import { strings } from '../../../shared/i18n/strings'
import QuarterNoteIcon from './icons/QuarterNoteIcon'
import EighthNoteIcon from './icons/EighthNoteIcon'
import TripletIcon from './icons/TripletIcon'
import SixteenthNoteIcon from './icons/SixteenthNoteIcon'
import styles from './SubdivisionSelector.module.css'

const SUBDIVISIONS = [
  { value: 1, label: strings.metronome.subdivisionQuarter, Icon: QuarterNoteIcon },
  { value: 2, label: strings.metronome.subdivisionEighth, Icon: EighthNoteIcon },
  { value: 3, label: strings.metronome.subdivisionTriplet, Icon: TripletIcon },
  { value: 4, label: strings.metronome.subdivisionSixteenth, Icon: SixteenthNoteIcon },
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
    <div className={styles.group}>
      <p className={styles.groupLabel}>{strings.metronome.subdivisionLabel}</p>
      <div className={styles.optionGrid}>
        {SUBDIVISIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            className={`${styles.optionButton} ${
              subdivision === option.value ? styles.optionButtonActive : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <option.Icon className={styles.optionIcon} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default SubdivisionSelector
