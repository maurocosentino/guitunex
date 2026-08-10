import type { AppModule } from '../types/module'
import { strings } from '../i18n/strings'
import GuitarIcon from './icons/GuitarIcon'
import PendulumIcon from './icons/PendulumIcon'
import styles from './ModuleSwitch.module.css'

type ModuleSwitchProps = {
  activeModule: AppModule
  onModuleChange: (appModule: AppModule) => void
}

function ModuleSwitch({ activeModule, onModuleChange }: ModuleSwitchProps) {
  const isMetronome = activeModule === 'metronome'

  return (
    <div className={styles.switchWrapper}>
      <input
        id="module-switch"
        type="checkbox"
        className={styles.checkbox}
        checked={isMetronome}
        onChange={(event) =>
          onModuleChange(event.target.checked ? 'metronome' : 'tuner')
        }
      />

      <div className={`${styles.pill} ${isMetronome ? styles.pillMoved : ''}`} />

      <div className={styles.optionsRow}>
        <span
          className={`${styles.option} ${!isMetronome ? styles.optionActive : ''}`}
        >
          <GuitarIcon className={styles.optionIcon} />
          {strings.header.tunerTab}
        </span>
        <span
          className={`${styles.option} ${isMetronome ? styles.optionActive : ''}`}
        >
          <PendulumIcon className={styles.optionIcon} />
          {strings.header.metronomeTab}
        </span>
      </div>
    </div>
  )
}

export default ModuleSwitch
