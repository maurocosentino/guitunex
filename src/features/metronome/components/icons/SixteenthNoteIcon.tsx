type NoteIconProps = {
  className?: string
}

function SixteenthNoteIcon({ className }: NoteIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="14" cy="75" rx="8.5" ry="6" transform="rotate(-24 14 75)" />
      <ellipse cx="38" cy="75" rx="8.5" ry="6" transform="rotate(-24 38 75)" />
      <ellipse cx="62" cy="75" rx="8.5" ry="6" transform="rotate(-24 62 75)" />
      <ellipse cx="86" cy="75" rx="8.5" ry="6" transform="rotate(-24 86 75)" />
      <rect x="19.5" y="25" width="2.5" height="50" />
      <rect x="43.5" y="25" width="2.5" height="50" />
      <rect x="67.5" y="25" width="2.5" height="50" />
      <rect x="91.5" y="25" width="2.5" height="50" />
      <rect x="19.5" y="25" width="74.5" height="4.5" />
      <rect x="19.5" y="34" width="74.5" height="4.5" />
    </svg>
  )
}

export default SixteenthNoteIcon
