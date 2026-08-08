import { useMetronome } from '../hooks/useMetronome'
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
        <p className={styles.label}>BPM</p>
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
          PAUSE
        </button>
      ) : (
        <button
          type="button"
          className={`${styles.button} ${styles.play}`}
          onClick={play}
        >
          PLAY
        </button>
      )}
    </>
  )
}

export default MetronomePage
