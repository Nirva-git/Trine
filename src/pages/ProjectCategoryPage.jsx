import { Navigate, useParams } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import './ProjectCategoryPage.css'

export default function ProjectCategoryPage() {
  const { slug } = useParams()
  const { content } = useContent()
  const category = content.projectCategories.find((item) => item.slug === slug)

  if (!category) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="project-page">
      <section className="project-content">

        <div className="container">
          <div className="project-content-inner">
            <p className="project-label">{category.label.toUpperCase()}</p>
            <h2 className="project-heading">Explore Recent Projects</h2>
            <p className="project-description">{category.description}</p>
          </div>

          <div className="project-grid">
            {category.projects.map((project) => (
              <article key={project.name} className="project-grid-card">
                <div className="project-grid-image">
                  <img src={project.image} alt={project.name} loading="lazy" />
                </div>
                <div className="project-grid-title">
                  <h3>{project.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
