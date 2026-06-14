import FadeLine from './FadeLine'
import EdgeButton from './EdgeButton'
import { useContent } from '../context/ContentContext'
import './Clients.css'

export default function Clients() {
  const { content } = useContent()

  return (
    <section className="clients section-with-edge-btn" id="services">
      <div className="container clients-inner">
        <h2 className="section-title-red clients-title">
          You Name It We Have Worked With
        </h2>

        <div className="clients-header-divider">
          <FadeLine variant="dark" />
          <p className="clients-tagline">
            But We Aren&apos;t Stopping Here Yet 2007 And Still Constructing
          </p>
        </div>

        <div className="clients-grid">
          {content.clients.map((client) => (
            <div key={client.id} className="client-cell">
              <div className="client-logo-wrap">
                <img
                  src={client.bw}
                  alt={client.name}
                  className="client-logo client-logo--bw"
                  loading="lazy"
                />
                <img
                  src={client.color}
                  alt=""
                  className="client-logo client-logo--color"
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="edge-btn-wrap">
        <EdgeButton href="#services" variant="dark">
          View All Clients
        </EdgeButton>
      </div>
    </section>
  )
}
