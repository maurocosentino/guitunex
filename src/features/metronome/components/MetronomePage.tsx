import { useMetronome } from '../hooks/useMetronome'
import { strings } from '../../../shared/i18n/strings'
import TimeSignatureSelector from './TimeSignatureSelector'
import SubdivisionSelector from './SubdivisionSelector'
import BeatIndicator from './BeatIndicator'
import styles from './MetronomePage.module.css'

const MIN_BPM = 30
const MAX_BPM = 300

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

  const fillPercentage = ((bpm - MIN_BPM) / (MAX_BPM - MIN_BPM)) * 100
  const sliderBackground = `linear-gradient(to right, var(--color-accent) ${fillPercentage}%, var(--color-border) ${fillPercentage}%)`

  return (
    <>
      <div className={styles.card}>
        <p className={styles.bpmValue}>{bpm}</p>
        <p className={styles.bpmCaption}>{strings.metronome.bpmLabel}</p>

        <div className={styles.sliderRow}>
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => setBpm(clampBpm(bpm - 1))}
          >
            −
          </button>

          <input
            className={styles.slider}
            style={{ background: sliderBackground }}
            type="range"
            min={MIN_BPM}
            max={MAX_BPM}
            value={bpm}
            onChange={(event) => setBpm(Number(event.target.value))}
          />

          <button
            type="button"
            className={styles.stepButton}
            onClick={() => setBpm(clampBpm(bpm + 1))}
          >
            +
          </button>
        </div>

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
