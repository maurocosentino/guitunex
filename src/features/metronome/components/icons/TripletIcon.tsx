type NoteIconProps = {
  className?: string
}

function TripletIcon({ className }: NoteIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="20" cy="75" rx="8.5" ry="6" transform="rotate(-24 20 75)" />
      <ellipse cx="50" cy="75" rx="8.5" ry="6" transform="rotate(-24 50 75)" />
      <ellipse cx="80" cy="75" rx="8.5" ry="6" transform="rotate(-24 80 75)" />
      <rect x="25.5" y="25" width="2.5" height="50" />
      <rect x="55.5" y="25" width="2.5" height="50" />
      <rect x="85.5" y="25" width="2.5" height="50" />
      <rect x="25.5" y="25" width="62.5" height="6" />
    </svg>
  )
}

export default TripletIcon
