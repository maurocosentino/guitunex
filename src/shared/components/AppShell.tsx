import type { ReactNode } from 'react'
import styles from './AppShell.module.css'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.page}>
      <div className={styles.console}>{children}</div>
    </div>
  )
}

export default AppShell
