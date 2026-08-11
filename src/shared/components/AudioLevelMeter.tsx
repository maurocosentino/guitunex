import { useId } from 'react'
import { strings } from '../i18n/strings'
import styles from './AudioLevelMeter.module.css'

const MIC_PATH =
  'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z'

const WAVE_PATH =
  'M-6,0 C -3,-4 0,4 3,0 C 6,-4 9,4 12,0 C 15,-4 18,4 21,0 C 24,-4 27,4 30,0 L30,40 L-6,40 Z'

const MAX_VISUAL_LEVEL = 0.8

type AudioLevelMeterProps = {
  level: number
}

function getVisualLevel(level: number): number {
  const boosted = Math.sqrt(Math.max(level, 0)) * 2.6
  return Math.min(boosted, MAX_VISUAL_LEVEL)
}

function AudioLevelMeter({ level }: AudioLevelMeterProps) {
  const uniqueId = useId()
  const micPathId = `${uniqueId}-mic`
  const maskId = `${uniqueId}-mask`

  const visualLevel = getVisualLevel(level)
  const fillPercentage = visualLevel * 100
  const fillY = 24 * (1 - visualLevel)

  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      role="meter"
      aria-label={strings.tuner.audioLevelAriaLabel}
      aria-valuenow={Math.round(fillPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <defs>
        <path id={micPathId} d={MIC_PATH} />
      </defs>
      <mask id={maskId}>
        <g
          className={styles.waveGroup}
          style={{ transform: `translateY(${fillY}px)` }}
        >
          <path className={styles.wavePath} d={WAVE_PATH} fill="white" />
        </g>
      </mask>
      <use href={`#${micPathId}`} className={styles.iconBase} />
      <use
        href={`#${micPathId}`}
        mask={`url(#${maskId})`}
        className={styles.iconFill}
      />
    </svg>
  )
}

export default AudioLevelMeter
