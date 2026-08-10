type NoteIconProps = {
  className?: string
}

function EighthNoteIcon({ className }: NoteIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="30" cy="75" rx="8.5" ry="6" transform="rotate(-24 30 75)" />
      <ellipse cx="70" cy="75" rx="8.5" ry="6" transform="rotate(-24 70 75)" />
      <rect x="35.5" y="25" width="2.5" height="50" />
      <rect x="75.5" y="25" width="2.5" height="50" />
      <rect x="35.5" y="25" width="42.5" height="6" />
    </svg>
  )
}

export default EighthNoteIcon
