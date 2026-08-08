import type { Instrument } from '../services/tunings'
import styles from './Header.module.css'

type HeaderProps = {
  instrument: Instrument
  onInstrumentChange: (instrument: Instrument) => void
}

function Header({ instrument, onInstrumentChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>🎵</div>
        <span className={styles.title}>TUNER</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.toggle}>
          <button
            type="button"
            className={`${styles.toggleOption} ${
              instrument === 'guitar' ? styles.toggleOptionActive : ''
            }`}
            onClick={() => onInstrumentChange('guitar')}
          >
            GUITAR
          </button>
          <button
            type="button"
            className={`${styles.toggleOption} ${
              instrument === 'ukulele' ? styles.toggleOptionActive : ''
            }`}
            onClick={() => onInstrumentChange('ukulele')}
          >
            UKULELE
          </button>
        </div>

        <button type="button" className={styles.iconButton} aria-label="Sostenidos/bemoles">
          ♯
        </button>
        <button type="button" className={styles.iconButton} aria-label="Tema">
          ◐
        </button>
      </div>
    </header>
  )
}

export default Header
