import { useCallback, useEffect, useState } from 'react'
import './ContentPages.css'
import { useContent } from '../context/ContentContext'

export default function LifeAtTrinePage() {
  const { content } = useContent()
  const [activeIndex, setActiveIndex] = useState(null)
  const events = content.lifeEvents
  const activeEvent = activeIndex === null ? null : events[activeIndex]

  const openGallery = (index) => setActiveIndex(index)
  const closeGallery = () => setActiveIndex(null)
  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index === null ? null : (index - 1 + events.length) % events.length))
  }, [events.length])
  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? null : (index + 1) % events.length))
  }, [events.length])

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeGallery()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, showNext, showPrevious])

  return (
    <main className="content-page">
      <div className="container">
        <header className="page-intro life-at-trine-intro">
          <p className="page-kicker">2008 - 2026</p>
          <h1 className="page-title">Life At Trine</h1>
          <p className="page-subtitle">EMPLOYMEENT AND SOCIAL ACTIVITY</p>
        </header>

        <div className="simple-card-grid life-grid">
          {events.map((event, index) => (
            <article className="simple-card" key={event.id}>
              <button type="button" className="life-card-button" onClick={() => openGallery(index)}>
                {event.image ? <img className="dummy-image" src={event.image} alt={event.title} /> : (
                  <div className="dummy-image" role="img" aria-label={`${event.title} placeholder`}>Dummy Image</div>
                )}
                <span>View Gallery</span>
              </button>
              <h2 className="simple-card-title">
                {event.title}
                <br />
                {event.year}
              </h2>
            </article>
          ))}
        </div>
      </div>

      {activeEvent && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${activeEvent.title} gallery`}>
          <button type="button" className="gallery-backdrop" onClick={closeGallery} aria-label="Close gallery" />
          <div className="gallery-panel">
            <button type="button" className="gallery-close" onClick={closeGallery} aria-label="Close gallery">×</button>
            <button type="button" className="gallery-nav gallery-nav--prev" onClick={showPrevious} aria-label="Previous image">&lt;</button>
            <div className="gallery-image-wrap">
              {activeEvent.image ? (
                <img src={activeEvent.image} alt={activeEvent.title} />
              ) : (
                <div className="dummy-image" role="img" aria-label={`${activeEvent.title} placeholder`}>Dummy Image</div>
              )}
            </div>
            <button type="button" className="gallery-nav gallery-nav--next" onClick={showNext} aria-label="Next image">&gt;</button>
            <div className="gallery-caption">
              <p>{activeIndex + 1} / {events.length}</p>
              <h2>{activeEvent.title}</h2>
              <span>{activeEvent.year}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
