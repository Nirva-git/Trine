import './ContentPages.css'
import { useContent } from '../context/ContentContext'

export default function PlantMachineryPage() {
  const { content } = useContent()
  return (
    <main className="content-page">
      <div className="container">
        <header className="page-intro">
          <p className="page-kicker">Our Heros</p>
          <h1 className="page-title machinery-page-title">Plant And Machinery</h1>
          <p className="page-subtitle machinery-page-subtitle">Best Machines for Best Outcome</p>
        </header>

        <div className="simple-card-grid machinery-grid">
          {content.machinery.map((machine) => (
            <article className="simple-card" key={machine.id}>
              {machine.image ? <img className="dummy-image" src={machine.image} alt={machine.title} /> : (
                <div className="dummy-image" role="img" aria-label={`${machine.title} placeholder`}>Dummy Image</div>
              )}
              <h2 className="simple-card-title">{machine.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
