export default function TrineMark({ className = '', outline = false }) {
  if (outline) {
    return (
      <svg
        className={className}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M100 24 L168 76 L138 76 L100 50 L62 76 L32 76 Z"
          stroke="#e4232a"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M62 76 C58 120 56 168 68 198 M138 76 C142 120 144 168 132 198"
          stroke="#e4232a"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M100 20 L170 75 L145 75 L100 45 L55 75 L30 75 Z" fill="#e4232a" />
      <path
        d="M55 75 C55 75 48 120 48 165 C48 185 62 200 75 200 L90 200 C78 185 72 150 72 120 C72 95 75 75 75 75 Z"
        fill="#e4232a"
      />
      <path
        d="M145 75 C145 75 152 120 152 165 C152 185 138 200 125 200 L110 200 C122 185 128 150 128 120 C128 95 125 75 125 75 Z"
        fill="#c41e24"
      />
    </svg>
  )
}
