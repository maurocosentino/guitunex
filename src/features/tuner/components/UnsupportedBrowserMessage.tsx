import { strings } from '../../../shared/i18n/strings'
import styles from './UnsupportedBrowserMessage.module.css'

function UnsupportedBrowserMessage() {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{strings.tuner.unsupportedTitle}</p>
      <p className={styles.text}>{strings.tuner.unsupportedText}</p>
    </div>
  )
}

export default UnsupportedBrowserMessage
