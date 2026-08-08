import styles from './StartListeningButton.module.css'

type StartListeningButtonProps = {
  onClick: () => void
  disabled: boolean
}

function StartListeningButton({
  onClick,
  disabled,
}: StartListeningButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'LISTENING...' : 'START LISTENING'}
    </button>
  )
}

export default StartListeningButton
