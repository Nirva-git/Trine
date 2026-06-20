import { useContent } from '../context/ContentContext'
import './Footer.css'

export default function Footer() {
  const { content } = useContent()

  return (
    <footer className="footer" id="more">
      <div className="footer-centered-content">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src="/TRINE%20LOGO%20SYMBOL%20W.png"
              alt="Trine Projects"
              className="footer-logo-img"
            />
          </div>

          <div className="footer-col footer-col--location">
            <h3 className="footer-heading">Location:</h3>
            <address className="footer-text">
              D/901, Westgate, Nr. Brooklyn Tower,
              <br />
              Near YMCA Club, Makarba, S. G. Highway,
              <br />
              Ahmedabad. Gujarat- 380053. India.
            </address>
          </div>

          <div className="footer-col footer-col--contact">
            <h3 className="footer-heading">Contact Details:</h3>
            <div className="footer-text">
              <p>
                <a href="tel:+917948455500">+91 79 4845 5500</a>
              </p>
              <p>
                <a href="tel:+917948465500">+91 79 4846 5500</a>
              </p>
              <p>
                <a href={`mailto:${content.site.companyEmail}`}>{content.site.companyEmail}</a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <div className="footer-line"></div>
          <p className="footer-copy">
            Copyright ©2026 Trine Projects. All Rights Reserved.{' '}
            <span className="footer-sep">|</span> Website Design &amp; Developed
            by{' '}
            <a
              href="https://theredowlmedia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              THE RED OWL MEDIA
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
