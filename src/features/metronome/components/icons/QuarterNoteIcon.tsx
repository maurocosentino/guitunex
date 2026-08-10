type NoteIconProps = {
  className?: string
}

function QuarterNoteIcon({ className }: NoteIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="45" cy="75" rx="8.5" ry="6" transform="rotate(-24 45 75)" />
      <rect x="50.5" y="20" width="2.5" height="55" />
    </svg>
  )
}

export default QuarterNoteIcon
