import { useState, useRef } from 'react'
import FadeLine from './FadeLine'
import { useContent } from '../context/ContentContext'
import { sendFormEmail } from '../utils/sendFormEmail'
import './Careers.css'

export default function Careers() {
  const { content } = useContent()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [fileName, setFileName] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : '')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && fileRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      fileRef.current.files = dt.files
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) {
      setStatus('Please attach your resume.')
      return
    }
    setSubmitting(true)
    setStatus('')
    try {
      // 1. Read the file as a base64 Data URL
      const resumeData = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // 2. Upload the resume and save the career application to the server
      const uploadRes = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          resumeName: file.name,
          resumeData,
        })
      })
      
      const uploadResult = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadResult.error || 'Failed to submit application to the server.')
      
      const fullResumeLink = `${window.location.origin}${uploadResult.resumeUrl}`

      // 3. Send email using Web3Forms with the resume link and application message
      await sendFormEmail({
        subject: `Career application from ${form.name}`,
        from_name: form.name,
        email: form.email,
        resume_file_name: file.name,
        message: [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Resume Link: ${fullResumeLink}`,
          '',
          `Message:`,
          form.message || '(No message content)',
        ].join('\n'),
      })

      setStatus('Application submitted successfully! Your resume and details have been logged.')
      setForm({ name: '', email: '', message: '' })
      setFileName('')
      fileRef.current.value = ''
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <section className="careers" id="careers">
      <div className="container careers-grid">
        <div className="careers-form-wrap">
          <h2 className="careers-title">{content.site.careersTitle}</h2>
          <p className="careers-subtitle">{content.site.careersSubtitle}</p>

          <form className="careers-form" onSubmit={handleSubmit} id="careers-form">
            <div className="form-field">
              <label htmlFor="career-name">Name</label>
              <input
                id="career-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="career-email">Mail Id</label>
              <input
                id="career-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="career-message">Message</label>
              <textarea
                id="career-message"
                name="message"
                rows={2}
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-submit-career"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
          {status && <p className="form-status" role="status">{status}</p>}
        </div>

        <div className="careers-side">
          <div className="upload-block">
            <div
              className="upload-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleFile}
                form="careers-form"
              />
              <p className="upload-title">
                {submitting ? 'Sending Application...' : 'Drag & Drop / Select File'}
              </p>
            </div>
            <p className="upload-hint">Upload Your CV (Max 25 MB)</p>
            {fileName && <p className="upload-file">{fileName}</p>}
            <FadeLine variant="light" className="upload-divider" />
          </div>

          <div className="hiring-overlap">
            <img
              src="/we%20are%20hiring.png"
              alt="We are hiring"
              className="hiring-illustration"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
