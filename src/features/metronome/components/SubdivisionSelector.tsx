import styles from './SubdivisionSelector.module.css'

const SUBDIVISIONS = [
  { value: 1, label: 'Negras' },
  { value: 2, label: 'Corcheas' },
  { value: 3, label: 'Tresillos' },
  { value: 4, label: 'Semicorcheas' },
]

type SubdivisionSelectorProps = {
  subdivision: number
  onChange: (subdivision: number) => void
}

function SubdivisionSelector({
  subdivision,
  onChange,
}: SubdivisionSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>SUBDIVISIÓN</p>
      <div className={styles.grid}>
        {SUBDIVISIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.option} ${
              subdivision === option.value ? styles.optionActive : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SubdivisionSelector
