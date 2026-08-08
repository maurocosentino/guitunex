import styles from './NoteDisplay.module.css'

type NoteDisplayProps = {
  note: string | null
  octave: number | null
  cents: number | null
}

function NoteDisplay({ note, octave, cents }: NoteDisplayProps) {
  return (
    <div className={styles.display}>
      {note !== null ? (
        <>
          <span className={styles.note}>
            {note}
            {octave}
          </span>
          <span className={styles.cents}>
            {cents !== null && cents > 0 ? '+' : ''}
            {cents} cents
          </span>
        </>
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  )
}

export default NoteDisplay
