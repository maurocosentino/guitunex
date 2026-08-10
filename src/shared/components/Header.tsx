import type { AppModule } from '../types/module'
import { strings } from '../i18n/strings'
import TuningForkIcon from './icons/TuningForkIcon'
import ModuleSwitch from './ModuleSwitch'
import styles from './Header.module.css'

type HeaderProps = {
  activeModule: AppModule
  onModuleChange: (appModule: AppModule) => void
}

function Header({ activeModule, onModuleChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <TuningForkIcon className={styles.logoIcon} />
        </div>
        <span className={styles.title}>{strings.header.appName}</span>
      </div>

      <ModuleSwitch activeModule={activeModule} onModuleChange={onModuleChange} />
    </header>
  )
}

export default Header
