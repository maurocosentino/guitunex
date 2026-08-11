import type { ReactNode } from 'react'
import styles from './PressButton.module.css'

type PressButtonProps = {
  children: ReactNode
  onClick: () => void
  variant?: 'accent' | 'danger'
}

function PressButton({ children, onClick, variant = 'accent' }: PressButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${variant === 'danger' ? styles.danger : ''}`}
      onClick={onClick}
    >
      <span className={styles.buttonInner}>{children}</span>
    </button>
  )
}

export default PressButton
