export async function requestMicrophoneAccess(
  deviceId?: string,
): Promise<MediaStream> {
  const audioConstraints: MediaTrackConstraints = deviceId
    ? { deviceId: { exact: deviceId } }
    : true

  return navigator.mediaDevices.getUserMedia({ audio: audioConstraints })
}
