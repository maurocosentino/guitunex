import styles from './UnsupportedBrowserMessage.module.css'

function UnsupportedBrowserMessage() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Tu navegador no es compatible</p>
      <p className={styles.text}>
        TuneLab necesita acceso al micrófono y a la Web Audio API. Probá con
        una versión reciente de Chrome, Firefox, Edge o Safari.
      </p>
    </div>
  )
}

export default UnsupportedBrowserMessage
