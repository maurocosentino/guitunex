import type { AppModule } from '../types/module'
import styles from './Header.module.css'

type HeaderProps = {
  activeModule: AppModule
  onModuleChange: (appModule: AppModule) => void
}

function Header({ activeModule, onModuleChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>🎵</div>
        <span className={styles.title}>TUNELAB</span>
      </div>

      <div className={styles.toggle}>
        <button
          type="button"
          className={`${styles.toggleOption} ${
            activeModule === 'tuner' ? styles.toggleOptionActive : ''
          }`}
          onClick={() => onModuleChange('tuner')}
        >
          TUNER
        </button>
        <button
          type="button"
          className={`${styles.toggleOption} ${
            activeModule === 'metronome' ? styles.toggleOptionActive : ''
          }`}
          onClick={() => onModuleChange('metronome')}
        >
          METRONOME
        </button>
      </div>
    </header>
  )
}

export default Header
