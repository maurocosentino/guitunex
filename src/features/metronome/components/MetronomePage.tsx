import { useMetronome } from '../hooks/useMetronome'
import { strings } from '../../../shared/i18n/strings'
import TimeSignatureSelector from './TimeSignatureSelector'
import SubdivisionSelector from './SubdivisionSelector'
import BeatIndicator from './BeatIndicator'
import styles from './MetronomePage.module.css'

const MIN_BPM = 40
const MAX_BPM = 240

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

  function clampBpm(value: number): number {
    return Math.min(MAX_BPM, Math.max(MIN_BPM, value))
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.bpmRow}>
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => setBpm(clampBpm(bpm - 1))}
          >
            −
          </button>
          <p className={styles.bpmValue}>{bpm}</p>
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => setBpm(clampBpm(bpm + 1))}
          >
            +
          </button>
        </div>
        <p className={styles.bpmCaption}>{strings.metronome.bpmLabel}</p>

        <input
          className={styles.slider}
          type="range"
          min={MIN_BPM}
          max={MAX_BPM}
          value={bpm}
          onChange={(event) => setBpm(Number(event.target.value))}
        />

        <BeatIndicator
          beatsPerMeasure={beatsPerMeasure}
          currentBeat={currentTick?.beatIndex ?? null}
        />
      </div>

      <TimeSignatureSelector
        beatsPerMeasure={beatsPerMeasure}
        onChange={setBeatsPerMeasure}
      />

      <SubdivisionSelector subdivision={subdivision} onChange={setSubdivision} />

      {isPlaying ? (
        <button
          type="button"
          className={`${styles.actionButton} ${styles.pauseButton}`}
          onClick={pause}
        >
          {strings.metronome.pause}
        </button>
      ) : (
        <button
          type="button"
          className={`${styles.actionButton} ${styles.playButton}`}
          onClick={play}
        >
          {strings.metronome.play}
        </button>
      )}
    </>
  )
}

export default MetronomePage
