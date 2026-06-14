import './ContentPages.css'
import { useContent } from '../context/ContentContext'

export default function ServicesPage() {
  const { content } = useContent()
  const services = content.services

  return (
    <main className="content-page services-page">
      <div className="container">
        <section className="service-feature">
          <div className="service-copy">
            <p className="service-eyebrow">Service</p>
            <h1 className="service-heading">{services.civilTitle}</h1>
            <p className="service-description">{services.civilDescription}</p>
          </div>
          {services.civilImage ? <img className="dummy-image" src={services.civilImage} alt={services.civilTitle} /> : (
            <div className="dummy-image" role="img" aria-label="Civil construction placeholder">Dummy Image</div>
          )}
        </section>

        <section className="service-feature service-feature--reverse">
          {services.turnkeyImage ? <img className="dummy-image" src={services.turnkeyImage} alt={services.turnkeyTitle} /> : (
            <div className="dummy-image" role="img" aria-label="Turnkey project placeholder">Dummy Image</div>
          )}
          <div className="service-copy">
            <p className="service-eyebrow">Service</p>
            <h2 className="service-heading">{services.turnkeyTitle}</h2>
            <p className="service-description">{services.turnkeyDescription}</p>
          </div>
        </section>

        <section className="activities">
          <h2 className="activities-title">
            Our Turnkey Projects Include Below Activity.
          </h2>
          <div className="activity-grid">
            {services.activities.map((activity) => (
              <article className="activity-card" key={activity.id}>
                {activity.image ? <img className="dummy-image" src={activity.image} alt={activity.title} /> : (
                  <div className="dummy-image" role="img" aria-label={`${activity.title} placeholder`}>Dummy Image</div>
                )}
                <h3 className="activity-title">{activity.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="core-values">
          <div>
            <h2 className="core-heading">{services.coreTitle}</h2>
            <p className="core-copy">{services.coreDescription}</p>
            <ul className="core-list">
              {services.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
          {services.coreImage ? <img className="dummy-image" src={services.coreImage} alt={services.coreTitle} /> : (
            <div className="dummy-image" role="img" aria-label="Core values placeholder">Dummy Image</div>
          )}
        </section>
      </div>
    </main>
  )
}
