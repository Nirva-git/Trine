import './FadeLine.css'

export default function FadeLine({ variant = 'light', className = '' }) {
  return (
    <div
      className={`fade-line fade-line--${variant}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    />
  )
}
