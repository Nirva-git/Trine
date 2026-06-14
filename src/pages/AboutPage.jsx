import './AboutPage.css'

export default function AboutPage() {
  return (
    <main className="content-page about-page">
      <div className="container">
        {/* Top Section */}
        <section className="about-hero-section">
          <div className="about-hero-content">
            <p className="about-kicker">About Leading Developer Company</p>
            <h1 className="about-title">
              Building your dreams into success stories.
            </h1>
            <p className="about-lead">
              Every dream deserves a chance to see the light of day! And that’s
              what we do... We construct your dreams and concretize your ideas!
            </p>
            <p className="about-body">
              What helps in building our reputation are our strong visionary founders and
              the team of veterans who have gained great experience ever since we entered the
              market in 2008. Leveraging technology and putting our best minds to work, is what
              helps us in excellent project execution. Right from the excavation to the finishing,
              we provide 360-degree turnkey construction solutions that propel our clients
              towards success.
            </p>
            <p className="about-body">
              Having begun at a small scale in Ahmedabad, today we proudly stand tall and have also
              spread our wings serving different cities and building various projects in Gujarat.
              And this is only thanks to the commitment we hold towards delivering nothing short of the best.
            </p>
          </div>

          <div className="about-hero-images">
            <div className="about-image-portrait-wrap">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=800&fit=crop&q=80"
                alt="Construction crane and high-rise building structure under construction"
                className="about-img about-img-portrait"
              />
              <div className="experience-badge">
                <span className="experience-badge-title">15+ YEARS OF</span>
                <span className="experience-badge-sub">EXPERIENCES</span>
              </div>
            </div>
            <div className="about-image-landscape-wrap">
              <img
                src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&h=450&fit=crop&q=80"
                alt="Two engineers in hardhats and safety vests checking blueprints on site"
                className="about-img about-img-landscape"
              />
            </div>
            {/* Decorative Dots Pattern */}
            <div className="dots-pattern" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} className="dot" />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="about-details-section">
          <div className="about-details-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80"
              alt="Engineers wearing safety gear working in front of a high rise structure"
              className="about-img about-details-img"
            />
          </div>

          <div className="about-details-content">
            <p className="about-body">
              When it comes to infrastructure development projects, we don’t just assist
              in building architecture, we provide a platform where people can come to make
              their dreams come true. Be it small-scale or large-scale construction projects,
              we have always been at the forefront, proving to be dependable and trustworthy.
              It is our attention to detail, meticulous planning and flawless execution which
              enables us to think ahead of the times and provide construction solutions that go
              beyond our client’s expectations.
            </p>
            <p className="about-body">
              We place more value in the relationships we share with our clients. We don’t
              build a clientele for just gaining projects. For us, creating relationships
              based on trust and faith is more important. And that’s what drives us to
              always provide quality services.
            </p>
            <p className="about-body">
              Our company is built on the pillars of hard work, integrity, commitment,
              and transparency, ensuring that we deliver projects of the highest quality
              on time, every time.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
