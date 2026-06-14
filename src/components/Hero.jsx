import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <p className="hero-eyebrow">Gujarat&apos;s Best</p>
        <h1 className="hero-title">
          Construction Co<span className="hero-dot" aria-hidden="true" />
        </h1>
        <p className="hero-since">Serving Since 2007</p>

        <div className="hero-image-wrap">
          <img
            src="/Hero%20Page%20Image.png"
            alt="Architectural blueprint of Trine Projects building"
            className="hero-image"
          />
        </div>

        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary btn-contact">
            <span>Contact Now</span>
            <span className="btn-phone-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 4h3l1.5 4.5-2 1.2a12 12 0 005.8 5.8l1.2-2L21 14.5V18a1.5 1.5 0 01-1.5 1.5C9.8 19.5 4.5 14.2 4.5 6A1.5 1.5 0 016 4.5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <a href="#projects" className="btn btn-outline">
            Explore Projects
          </a>
        </div>
      </div>
    </section>
  )
}
