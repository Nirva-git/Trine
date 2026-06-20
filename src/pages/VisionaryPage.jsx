import './ContentPages.css'
import { useContent } from '../context/ContentContext'

export default function VisionaryPage() {
  const { content } = useContent()
  return (
    <main className="content-page">
      <div className="container">
        <header className="page-intro">
          <p className="page-kicker">Our Heros</p>
          <h1 className="page-title visionary-page-title">Our Visionary</h1>
          <p className="page-subtitle visionary-page-subtitle">2007 and still counting</p>
        </header>

        <div className="people-grid">
          {content.leaders.map((leader) => (
            <article className="person-card" key={leader.id}>
              {leader.image ? <img className="dummy-image" src={leader.image} alt={leader.name} /> : (
                <div className="dummy-image" role="img" aria-label={`${leader.name} placeholder`}>Dummy Image</div>
              )}
              <h2 className="person-name">{leader.name}</h2>
              <p className="person-copy">{leader.biography}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
