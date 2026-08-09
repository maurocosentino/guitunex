import styles from './NoteDisplay.module.css'

type NoteDisplayProps = {
  note: string | null
  octave: number | null
  cents: number | null
}

function NoteDisplay({ note, octave, cents }: NoteDisplayProps) {
  return (
    <div className={styles.card}>
      {note !== null ? (
        <>
          <span className={styles.noteText}>
            {note}
            {octave}
          </span>
          <span className={styles.centsText}>
            {cents !== null && cents > 0 ? '+' : ''}
            {cents} cents
          </span>
        </>
      ) : (
        <div className={styles.emptyIndicator} />
      )}
    </div>
  )
}

export default NoteDisplay
