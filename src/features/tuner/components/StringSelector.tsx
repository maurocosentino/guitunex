import type { Instrument, TuningString } from '../services/tunings'
import { getStringAudioUrl } from '../services/stringReferenceAudio'
import { useStringReferencePlayer } from '../hooks/useStringReferencePlayer'
import styles from './StringSelector.module.css'

type StringSelectorProps = {
  instrument: Instrument
  tuningId: string
  strings: TuningString[]
}

function StringSelector({ instrument, tuningId, strings }: StringSelectorProps) {
  const { playUrl, isRepeatEnabled, toggleRepeat } = useStringReferencePlayer()

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.label}>STRINGS</p>
        <button
          type="button"
          className={`${styles.repeatToggle} ${
            isRepeatEnabled ? styles.repeatToggleActive : ''
          }`}
          onClick={toggleRepeat}
        >
          REPEAT
        </button>
      </div>

      <div className={styles.grid}>
        {strings.map((string) => {
          const audioUrl = getStringAudioUrl(
            instrument,
            tuningId,
            string.label,
          )

          return (
            <button
              key={string.label}
              type="button"
              className={styles.string}
              disabled={audioUrl === null}
              onClick={() => audioUrl !== null && playUrl(audioUrl)}
            >
              <span className={styles.stringLabel}>{string.label}</span>
              <span className={styles.stringFrequency}>
                {string.frequency.toFixed(2)} Hz
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default StringSelector
