import './EdgeButton.css'

export default function EdgeButton({
  href,
  type = 'button',
  form,
  variant = 'light',
  children,
  className = '',
  onClick,
}) {
  const classes = `btn btn-edge btn-edge--${variant}${className ? ` ${className}` : ''}`

  const arrow = (
    <span className="btn-edge-icon" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </span>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {arrow}
      </a>
    )
  }

  return (
    <button type={type} form={form} className={classes} onClick={onClick}>
      {children}
      {arrow}
    </button>
  )
}
