import type { Instrument, Tuning } from '../services/tunings'
import styles from './InstrumentSelector.module.css'

type InstrumentSelectorProps = {
  instrument: Instrument
  tunings: Tuning[]
  selectedTuningId: string
  onInstrumentChange: (instrument: Instrument) => void
  onTuningChange: (tuningId: string) => void
}

function InstrumentSelector({
  instrument,
  tunings,
  selectedTuningId,
  onInstrumentChange,
  onTuningChange,
}: InstrumentSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={instrument}
        onChange={(event) =>
          onInstrumentChange(event.target.value as Instrument)
        }
      >
        <option value="guitar">Guitar</option>
        <option value="bass">Bass</option>
      </select>

      <select
        className={styles.select}
        value={selectedTuningId}
        onChange={(event) => onTuningChange(event.target.value)}
      >
        {tunings.map((tuning) => (
          <option key={tuning.id} value={tuning.id}>
            {tuning.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InstrumentSelector
