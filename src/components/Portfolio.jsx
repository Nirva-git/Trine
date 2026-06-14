import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeLine from './FadeLine'
import EdgeButton from './EdgeButton'
import { useContent } from '../context/ContentContext'
import './Portfolio.css'

export default function Portfolio() {
  const [startIndex, setStartIndex] = useState(0)
  const { content } = useContent()
  const projects = content.projectCategories.flatMap((category) => category.projects)
  const visibleCount = 5

  const prev = () => {
    setStartIndex((i) => (i - 1 + projects.length) % projects.length)
  }

  const next = () => {
    setStartIndex((i) => (i + 1) % projects.length)
  }

  const visible = []
  for (let i = 0; i < visibleCount; i++) {
    if (projects.length) visible.push(projects[(startIndex + i) % projects.length])
  }

  return (
    <section className="portfolio section-pill section-with-edge-btn" id="projects">
      <div className="container portfolio-container">
        <h2 className="section-title-red">You Name It We Have Built It</h2>

        <div className="portfolio-categories">
          <FadeLine variant="light" />
          <p className="portfolio-category-list">
            {content.projectCategories.map((cat, i) => (
              <span key={cat.slug}>
                {i > 0 && <span className="category-sep">|</span>}
                <Link to={`/projects/${cat.slug}`} className="portfolio-category-link">
                  {cat.label}
                </Link>
              </span>
            ))}
          </p>
        </div>

        <div className="carousel-wrap">
          <button
            type="button"
            className="carousel-arrow"
            onClick={prev}
            aria-label="Previous projects"
          >
            ‹
          </button>

          <div className="carousel-track">
            {visible.map((project, idx) => (
              <article key={`${project.id}-${idx}`} className="project-card">
                <div className="project-card-image">
                  <img src={project.image} alt={project.name} loading="lazy" />
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.name}</h3>
                  <FadeLine variant="card" className="project-card-divider" />
                  <p className="project-card-location">{project.location}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow"
            onClick={next}
            aria-label="Next projects"
          >
            ›
          </button>
        </div>
      </div>

      <div className="edge-btn-wrap">
        <EdgeButton href="/projects/residential" variant="light">
          Explore All Projects
        </EdgeButton>
      </div>
    </section>
  )
}
