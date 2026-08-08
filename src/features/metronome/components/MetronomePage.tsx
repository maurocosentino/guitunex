import { useMetronome } from '../hooks/useMetronome'
import styles from './MetronomePage.module.css'

function MetronomePage() {
  const { bpm, setBpm, isPlaying, play, pause } = useMetronome()

  return (
    <div className={styles.wrapper}>
      <p className={styles.bpm}>{bpm}</p>
      <p className={styles.label}>BPM</p>

      <input
        className={styles.slider}
        type="range"
        min={40}
        max={240}
        value={bpm}
        onChange={(event) => setBpm(Number(event.target.value))}
      />

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
    </div>
  )
}

export default MetronomePage
