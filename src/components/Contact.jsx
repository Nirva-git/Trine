import { useState } from 'react'
import EdgeButton from './EdgeButton'
import { useContent } from '../context/ContentContext'
import { sendFormEmail } from '../utils/sendFormEmail'
import './Contact.css'

export default function Contact() {
  const { content } = useContent()
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')
    try {
      await sendFormEmail({
        subject: `Website enquiry from ${form.name}`,
        from_name: form.name,
        email: form.email,
        phone: form.contact,
        message: [
          `Name: ${form.name}`,
          `Phone: ${form.contact}`,
          `Email: ${form.email}`,
          `Message: ${form.message || ''}`,
        ].join('\n'),
      })
      setStatus('Thank you. Your message has been emailed to our team.')
      setForm({ name: '', contact: '', email: '', message: '' })
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact section-pill section-with-edge-btn" id="contact">
      <div className="container contact-grid">
        <div className="contact-form-wrap">
          <h2 className="contact-title">{content.site.contactTitle}</h2>
          <p className="contact-subtitle">{content.site.contactSubtitle}</p>

          <form
            id="contact-form"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-field">
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="NAME"
                aria-label="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <input
                id="contact-phone"
                name="contact"
                type="tel"
                placeholder="CONTACT NO."
                aria-label="Contact Number"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="MAIL ID"
                aria-label="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <textarea
                id="contact-message"
                name="message"
                rows={1}
                placeholder="MESSAGE"
                aria-label="Message"
                value={form.message}
                onChange={handleChange}
              />
            </div>
          </form>
          {status && <p className="form-status" role="status">{status}</p>}
        </div>

        <div className="contact-mark-wrap">
          <img
            src="/trine%20outline.png"
            alt=""
            className="contact-mark"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="edge-btn-wrap">
        <EdgeButton type="submit" form="contact-form" variant="light">
          {submitting ? 'Sending...' : 'Submit My Form Now'}
        </EdgeButton>
      </div>
    </section>
  )
}
