import { strings } from '../../../shared/i18n/strings'
import styles from './RepeatToggle.module.css'

type RepeatToggleProps = {
  checked: boolean
  onChange: () => void
}

function RepeatToggle({ checked, onChange }: RepeatToggleProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{strings.tuner.repeatToggle}</span>
      <label className={styles.button}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={onChange}
        />
        <div className={styles.knob} />
        <div className={styles.layer} />
      </label>
    </div>
  )
}

export default RepeatToggle
