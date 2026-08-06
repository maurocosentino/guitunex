export function detectPitch(
  buffer: Float32Array,
  sampleRate: number,
): number | null {
  const minFrequency = 60
  const maxFrequency = 1000

  const minLag = Math.floor(sampleRate / maxFrequency)
  const maxLag = Math.floor(sampleRate / minFrequency)

  const differences = calculateDifferenceFunction(buffer, maxLag)
  const cmnd = calculateCMND(differences)
  const lag = findPitchLag(cmnd, minLag)

  if (lag === null) {
    return null
  }

  const refinedLag = refineLagWithParabolicInterpolation(cmnd, lag)

  return sampleRate / refinedLag
}

function calculateDifferenceFunction(
  buffer: Float32Array,
  maxLag: number,
): Float32Array {
  const windowSize = buffer.length - maxLag
  const differences = new Float32Array(maxLag)

  for (let lag = 0; lag < maxLag; lag++) {
    let sum = 0

    for (let j = 0; j < windowSize; j++) {
      const delta = buffer[j] - buffer[j + lag]
      sum += delta * delta
    }

    differences[lag] = sum
  }

  return differences
}

function calculateCMND(differences: Float32Array): Float32Array {
  const cmnd = new Float32Array(differences.length)
  cmnd[0] = 1

  let runningSum = 0

  for (let lag = 1; lag < differences.length; lag++) {
    runningSum += differences[lag]
    cmnd[lag] = differences[lag] / (runningSum / lag)
  }

  return cmnd
}

function findPitchLag(
  cmnd: Float32Array,
  minLag: number,
  threshold = 0.1,
): number | null {
  for (let lag = minLag; lag < cmnd.length - 1; lag++) {
    if (cmnd[lag] < threshold && cmnd[lag] < cmnd[lag + 1]) {
      return lag
    }
  }

  return null
}

function refineLagWithParabolicInterpolation(
  cmnd: Float32Array,
  lag: number,
): number {
  if (lag <= 0 || lag >= cmnd.length - 1) {
    return lag
  }

  const x0 = cmnd[lag - 1]
  const x1 = cmnd[lag]
  const x2 = cmnd[lag + 1]

  const denominator = 2 * (x0 - 2 * x1 + x2)

  if (denominator === 0) {
    return lag
  }

  const adjustment = (x0 - x2) / denominator

  return lag + adjustment
}
