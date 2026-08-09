import { useMetronome } from '../hooks/useMetronome'
import { strings } from '../../../shared/i18n/strings'
import BpmControl from './BpmControl'
import TimeSignatureSelector from './TimeSignatureSelector'
import SubdivisionSelector from './SubdivisionSelector'
import BeatIndicator from './BeatIndicator'
import styles from './MetronomePage.module.css'

function MetronomePage() {
  const {
    bpm,
    setBpm,
    beatsPerMeasure,
    setBeatsPerMeasure,
    subdivision,
    setSubdivision,
    isPlaying,
    currentTick,
    play,
    pause,
  } = useMetronome()

  return (
    <>
      <div className={styles.display}>
        <p className={styles.bpm}>{bpm}</p>
        <p className={styles.label}>{strings.metronome.bpmLabel}</p>
        <BeatIndicator
          beatsPerMeasure={beatsPerMeasure}
          currentBeat={currentTick?.beatIndex ?? null}
        />
      </div>

      <BpmControl bpm={bpm} onChange={setBpm} />

      <TimeSignatureSelector
        beatsPerMeasure={beatsPerMeasure}
        onChange={setBeatsPerMeasure}
      />

      <SubdivisionSelector subdivision={subdivision} onChange={setSubdivision} />

      {isPlaying ? (
        <button
          type="button"
          className={`${styles.button} ${styles.pauseButton}`}
          onClick={pause}
        >
          {strings.metronome.pause}
        </button>
      ) : (
        <button
          type="button"
          className={`${styles.button} ${styles.play}`}
          onClick={play}
        >
          {strings.metronome.play}
        </button>
      )}
    </>
  )
}

export default MetronomePage
