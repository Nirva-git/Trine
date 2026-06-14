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
      ›
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
