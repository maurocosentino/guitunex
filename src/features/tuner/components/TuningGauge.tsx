import styles from './TuningGauge.module.css'

type TuningGaugeProps = {
  cents: number
  hasSignal: boolean
}

const CENTER_X = 150
const CENTER_Y = 150
const RADIUS = 120
const NEEDLE_LENGTH = 110

function polarToCartesian(angleInDegrees: number, radius: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: CENTER_X + radius * Math.cos(angleInRadians),
    y: CENTER_Y + radius * Math.sin(angleInRadians),
  }
}

function describeArc(startAngle: number, endAngle: number) {
  const start = polarToCartesian(endAngle, RADIUS)
  const end = polarToCartesian(startAngle, RADIUS)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function TuningGauge({ cents, hasSignal }: TuningGaugeProps) {
  const clampedCents = Math.max(-50, Math.min(50, cents))
  const needleAngle = hasSignal ? (clampedCents / 50) * 90 : 0

  const needleEnd = polarToCartesian(needleAngle, NEEDLE_LENGTH)

  return (
    <div className={styles.card}>
      <svg className={styles.svg} viewBox="0 0 300 170">
        <path
          d={describeArc(-90, -60)}
          stroke="var(--color-danger)"
          strokeWidth="10"
          fill="none"
        />
        <path
          d={describeArc(-60, -15)}
          stroke="var(--color-warning)"
          strokeWidth="10"
          fill="none"
        />
        <path
          d={describeArc(-15, 15)}
          stroke="var(--color-success)"
          strokeWidth="10"
          fill="none"
        />
        <path
          d={describeArc(15, 60)}
          stroke="var(--color-warning)"
          strokeWidth="10"
          fill="none"
        />
        <path
          d={describeArc(60, 90)}
          stroke="var(--color-danger)"
          strokeWidth="10"
          fill="none"
        />

        <line
          className={styles.needle}
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={CENTER_X} cy={CENTER_Y} r="5" fill="var(--color-accent)" />
      </svg>
    </div>
  )
}

export default TuningGauge
