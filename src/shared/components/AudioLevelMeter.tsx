type AudioLevelMeterProps = {
  level: number
}

function AudioLevelMeter({ level }: AudioLevelMeterProps) {
  const clampedLevel = Math.min(level, 1)
  const widthPercentage = clampedLevel * 100

  return (
    <div
      role="meter"
      aria-label="Nivel de audio de entrada"
      aria-valuenow={Math.round(widthPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#ddd',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${widthPercentage}%`,
          height: '100%',
          backgroundColor: '#4caf50',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  )
}

export default AudioLevelMeter
