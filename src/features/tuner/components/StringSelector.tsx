import type { Instrument, TuningString } from '../services/tunings'
import { getStringAudioUrl } from '../services/stringReferenceAudio'
import { useStringReferencePlayer } from '../hooks/useStringReferencePlayer'
import { strings } from '../../../shared/i18n/strings'
import styles from './StringSelector.module.css'

type StringSelectorProps = {
  instrument: Instrument
  tuningId: string
  tuningStrings: TuningString[]
}

function StringSelector({
  instrument,
  tuningId,
  tuningStrings,
}: StringSelectorProps) {
  const { playUrl, isRepeatEnabled, toggleRepeat } = useStringReferencePlayer()

  return (
    <div className={styles.card}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>{strings.tuner.stringsLabel}</p>
        <button
          type="button"
          className={`${styles.repeatToggle} ${
            isRepeatEnabled ? styles.repeatToggleActive : ''
          }`}
          onClick={toggleRepeat}
        >
          {strings.tuner.repeatToggle}
        </button>
      </div>

      <div className={styles.stringGrid}>
        {tuningStrings.map((string) => {
          const audioUrl = getStringAudioUrl(
            instrument,
            tuningId,
            string.label,
          )

          return (
            <button
              key={string.label}
              type="button"
              className={styles.stringButton}
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
