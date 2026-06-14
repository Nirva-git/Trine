import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import './Header.css'

const strengthLinks = [
  { label: 'Our Visionary', path: '/our-strength/visionary' },
  { label: 'Plant & Machinery', path: '/our-strength/plant-machinery' },
]

export default function Header() {
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [strengthOpen, setStrengthOpen] = useState(false)
  const location = useLocation()
  const { content } = useContent()
  const isProjectPage = location.pathname.startsWith('/projects/')
  const isStrengthPage = location.pathname.startsWith('/our-strength/')

  return (
    <header className="header" id="about">
      <div className="container header-inner">
        <nav className="nav nav-left" aria-label="Primary left">
          <Link
            to="/services"
            className={`nav-link${location.pathname === '/services' ? ' nav-link--active' : ''}`}
          >
            Services
          </Link>

          <div
            className={`nav-item-dropdown${projectsOpen ? ' is-open' : ''}`}
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              type="button"
              className={`nav-link nav-link-trigger${isProjectPage ? ' nav-link--active' : ''}`}
              aria-expanded={projectsOpen}
              aria-haspopup="true"
              onClick={() => setProjectsOpen((open) => !open)}
            >
              Projects
            </button>
            <ul className="nav-dropdown" role="menu">
              {content.projectCategories.map((cat) => (
                <li key={cat.slug} role="none">
                  <Link
                    to={`/projects/${cat.slug}`}
                    className={`nav-dropdown-link${
                      location.pathname === `/projects/${cat.slug}` ? ' is-active' : ''
                    }`}
                    role="menuitem"
                    onClick={() => setProjectsOpen(false)}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/careers"
            className={`nav-link${location.pathname === '/careers' ? ' nav-link--active' : ''}`}
          >
            Careers
          </Link>
        </nav>

        <Link to="/" className="logo-wrap" aria-label="Trine Projects home">
          <img src="/trine%20logo%20symbol.png" alt="Trine Projects" className="logo-img" />
        </Link>

        <nav className="nav nav-right" aria-label="Primary right">
          <Link
            to="/about"
            className={`nav-link${location.pathname === '/about' ? ' nav-link--active' : ''}`}
          >
            About Us
          </Link>


          <div
            className={`nav-item-dropdown${strengthOpen ? ' is-open' : ''}`}
            onMouseEnter={() => setStrengthOpen(true)}
            onMouseLeave={() => setStrengthOpen(false)}
          >
            <button
              type="button"
              className={`nav-link nav-link-trigger${isStrengthPage ? ' nav-link--active' : ''}`}
              aria-expanded={strengthOpen}
              aria-haspopup="true"
              onClick={() => setStrengthOpen((open) => !open)}
            >
              Our Strength
            </button>
            <ul className="nav-dropdown nav-dropdown--strength" role="menu">
              {strengthLinks.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    className={`nav-dropdown-link${
                      location.pathname === item.path ? ' is-active' : ''
                    }`}
                    role="menuitem"
                    onClick={() => setStrengthOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/life-at-trine"
            className={`nav-link${location.pathname === '/life-at-trine' ? ' nav-link--active' : ''}`}
          >
            Life At Trine
          </Link>
        </nav>
      </div>
    </header>
  )
}
