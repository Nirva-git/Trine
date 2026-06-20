import Careers from '../components/Careers'
import { useContent } from '../context/ContentContext'
import './ContentPages.css'

export default function CareersPage() {
  const { content } = useContent()

  return (
    <main>
      <section className="content-page">
        <div className="container">
          <header className="page-intro">
            <p className="page-kicker">Apply | Interview | Join</p>
            <h1 className="page-title careers-page-title">Job Details</h1>
            <p className="page-subtitle careers-page-subtitle">Keep CV Little Interesting plz!!</p>
          </header>

          <div className="jobs-grid">
            {content.jobs.map((job) => (
              <article className="job-card" key={job.id}>
                {job.image ? <img className="dummy-image" src={job.image} alt={job.title} /> : (
                  <div className="dummy-image" role="img" aria-label={`${job.title} placeholder`}>Dummy Image</div>
                )}
                <h2 className="job-title">{job.title}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Careers />
    </main>
  )
}
