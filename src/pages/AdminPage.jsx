import { useEffect, useState } from 'react'
import { cloneDefaultContent } from '../data/defaultContent'
import { useContent } from '../context/ContentContext'
import './AdminPage.css'

const tabs = ['Site Text', 'Clients', 'Projects', 'Careers', 'Our Strength', 'Life At Trine', 'Services', 'Applications']
const sectionDescriptions = {
  'Site Text': 'Manage reusable headings, subtitles, and company contact text.',
  Clients: 'Update client names and logo artwork shown on the public website.',
  Projects: 'Edit project categories, hero images, and project cards.',
  Careers: 'Maintain open positions and their page images.',
  'Our Strength': 'Update plant, machinery, and leadership profile content.',
  'Life At Trine': 'Manage culture events and gallery cards.',
  Services: 'Update services, activities, and core value content.',
  Applications: 'Review and manage job applications and resumes submitted by candidates.',
}


function Field({ label, value, onChange, multiline = false }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <label className="admin-field">
      <span>{label}</span>
      <Tag value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function UploadField({ label, value, onChange, token }) {
  const upload = async (file) => {
    if (!file) return
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: file.name, dataUrl }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Upload failed')
    onChange(result.url)
  }

  return (
    <div className="admin-upload">
      <Field label={label} value={value} onChange={onChange} />
      <label className="admin-file-picker">
        <input type="file" accept="image/*" onChange={(event) => upload(event.target.files?.[0])} />
        <span>Upload image</span>
      </label>
      <div className="admin-image-preview">
        {value ? <img src={value} alt={`${label} preview`} /> : <span>No image selected</span>}
      </div>
    </div>
  )
}

function ItemActions({ onRemove }) {
  return <button type="button" className="admin-danger" onClick={onRemove}>Remove</button>
}

export default function AdminPage() {
  const { content, setContent } = useContent()
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(content)))
  const [dirty, setDirty] = useState(false)
  const [token, setToken] = useState(() => sessionStorage.getItem('trine-admin') || '')
  const [password, setPassword] = useState('')
  const [active, setActive] = useState(tabs[0])
  const [status, setStatus] = useState('')

  const [applications, setApplications] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const itemCount = {
    'Site Text': Object.keys(draft.site).length,
    Clients: draft.clients.length,
    Projects: draft.projectCategories.length,
    Careers: draft.jobs.length,
    'Our Strength': draft.machinery.length + draft.leaders.length,
    'Life At Trine': draft.lifeEvents.length,
    Services: draft.services.activities.length,
    Applications: applications.length,
  }[active]

  useEffect(() => {
    if (!dirty) {
      queueMicrotask(() => setDraft(JSON.parse(JSON.stringify(content))))
    }
  }, [content, dirty])

  useEffect(() => {
    if (active === 'Applications' && token) {
      fetch('/api/admin/applications', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorised or API error')
          return res.json()
        })
        .then((data) => {
          if (Array.isArray(data)) setApplications(data)
        })
        .catch((err) => {
          setStatus('Failed to load applications: ' + err.message)
        })
    }
  }, [active, token])

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this career application? This will also delete the associated resume file.')) return
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to delete application')
      setApplications((prev) => prev.filter((app) => app.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }


  const login = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!response.ok) return setStatus('Incorrect password.')
    sessionStorage.setItem('trine-admin', password)
    setToken(password)
    setStatus('')
  }

  const update = (section, value) => {
    setDirty(true)
    setStatus('Unsaved changes. Click Save Changes to publish them on the website.')
    setDraft((previous) => ({ ...previous, [section]: value }))
  }
  const updateListItem = (section, index, patch) => {
    const list = [...draft[section]]
    list[index] = { ...list[index], ...patch }
    update(section, list)
  }
  const removeListItem = (section, index) => update(section, draft[section].filter((_, itemIndex) => itemIndex !== index))
  const addListItem = (section, item) => update(section, [...draft[section], item])

  const save = async () => {
    setStatus('Saving...')
    const response = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    })
    const result = await response.json()
    if (!response.ok) return setStatus(result.error || 'Save failed.')
    setContent(JSON.parse(JSON.stringify(draft)))
    setDirty(false)
    setStatus('Saved. The public website is now updated.')
  }

  const resetDraft = () => {
    setDraft(cloneDefaultContent())
    setDirty(true)
    setStatus('Default content loaded as a draft. Click Save Changes to publish it.')
  }

  if (!token) {
    return (
      <main className="admin-login">
        <form onSubmit={login} className="admin-login-card">
          <img src="/trine%20logo%20symbol%20cropped.png" alt="Trine Projects" className="admin-login-logo" />
          <div>
            <p className="admin-kicker">Trine Projects</p>
            <h1>Admin Website </h1>
          </div>
          <Field label="Admin password" value={password} onChange={setPassword} />
          <button type="submit" className="admin-primary">Sign In</button>
          {status && <p className="admin-status">{status}</p>}
          <p className="admin-powered-by">Powered by The Red Owl Media</p>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/trine%20logo%20symbol%20cropped.png" alt="Trine Projects" />
          <div>
            <p>Trine Projects</p>
            <h1>Content Studio</h1>
          </div>
        </div>
        <nav className="admin-nav" aria-label="Admin sections">
          {tabs.map((tab) => (
            <button key={tab} className={active === tab ? 'is-active' : ''} onClick={() => setActive(tab)}>
              <span>{tab}</span>
              <small>{tab === active ? 'Editing' : 'Open'}</small>
            </button>
          ))}
        </nav>
        <a href="/" target="_blank" rel="noreferrer">Open Website</a>
      </aside>

      <section className="admin-workspace">
        <header className="admin-toolbar">
          <div>
            <p className="admin-kicker">Editing</p>
            <h2>{active}</h2>
            <span>{sectionDescriptions[active]}</span>
          </div>
          <div className="admin-toolbar-actions">
            <button type="button" onClick={resetDraft}>Reset Draft</button>
            <button type="button" className="admin-primary" onClick={save}>Save Changes</button>
          </div>
        </header>
        <div className="admin-summary">
          <div>
            <strong>{itemCount}</strong>
            <span>{active === 'Site Text' ? 'editable fields' : 'items in this section'}</span>
          </div>
          <p>Main brand logos are static website assets. Edit section images here; replace static logos directly in `public` when needed.</p>
        </div>
        {status && <p className={`admin-status${dirty ? ' is-dirty' : ''}`}>{status}</p>}

        {active === 'Site Text' && (
          <div className="admin-card admin-form-grid">
            {Object.entries(draft.site).map(([key, value]) => (
              <Field key={key} label={key} value={value} onChange={(next) => update('site', { ...draft.site, [key]: next })} multiline={key.toLowerCase().includes('description')} />
            ))}
          </div>
        )}

        {active === 'Clients' && (
          <div className="admin-list">
            {draft.clients.map((client, index) => (
              <article className="admin-card" key={client.id}>
                <Field label="Client name" value={client.name} onChange={(name) => updateListItem('clients', index, { name })} />
                <UploadField label="Black & white logo" value={client.bw} onChange={(bw) => updateListItem('clients', index, { bw })} token={token} />
                <UploadField label="Colored logo" value={client.color} onChange={(color) => updateListItem('clients', index, { color })} token={token} />
                <ItemActions onRemove={() => removeListItem('clients', index)} />
              </article>
            ))}
            <button className="admin-add" onClick={() => addListItem('clients', { id: crypto.randomUUID(), name: 'New Client', bw: '', color: '' })}>Add Client</button>
          </div>
        )}

        {active === 'Projects' && (
          <div className="admin-list">
            {draft.projectCategories.map((category, categoryIndex) => (
              <article className="admin-card" key={category.id}>
                <div className="admin-form-grid">
                  <Field label="Category" value={category.label} onChange={(label) => updateListItem('projectCategories', categoryIndex, { label })} />
                  <Field label="Slug" value={category.slug} onChange={(slug) => updateListItem('projectCategories', categoryIndex, { slug })} />
                  <Field label="Description" value={category.description} multiline onChange={(description) => updateListItem('projectCategories', categoryIndex, { description })} />
                  <UploadField label="Hero image" value={category.heroImage} token={token} onChange={(heroImage) => updateListItem('projectCategories', categoryIndex, { heroImage })} />
                </div>
                <h3>Projects</h3>
                {category.projects.map((project, projectIndex) => (
                  <div className="admin-nested" key={project.id}>
                    <Field label="Project name" value={project.name} onChange={(name) => {
                      const projects = [...category.projects]
                      projects[projectIndex] = { ...project, name, title: name }
                      updateListItem('projectCategories', categoryIndex, { projects })
                    }} />
                    <Field label="Location" value={project.location} onChange={(location) => {
                      const projects = [...category.projects]
                      projects[projectIndex] = { ...project, location }
                      updateListItem('projectCategories', categoryIndex, { projects })
                    }} />
                    <UploadField label="Project image" value={project.image} token={token} onChange={(image) => {
                      const projects = [...category.projects]
                      projects[projectIndex] = { ...project, image }
                      updateListItem('projectCategories', categoryIndex, { projects })
                    }} />
                    <ItemActions onRemove={() => updateListItem('projectCategories', categoryIndex, { projects: category.projects.filter((_, i) => i !== projectIndex) })} />
                  </div>
                ))}
                <button className="admin-add" onClick={() => updateListItem('projectCategories', categoryIndex, { projects: [...category.projects, { id: crypto.randomUUID(), name: 'New Project', title: 'New Project', location: '', image: '' }] })}>Add Project</button>
              </article>
            ))}
          </div>
        )}

        {active === 'Careers' && <CollectionEditor items={draft.jobs} token={token} fields={['title', 'image']} onChange={(jobs) => update('jobs', jobs)} addLabel="Add Job" />}
        {active === 'Our Strength' && (
          <>
            <h3 className="admin-section-title">Plant & Machinery</h3>
            <CollectionEditor items={draft.machinery} token={token} fields={['title', 'image']} onChange={(machinery) => update('machinery', machinery)} addLabel="Add Machine" />
            <h3 className="admin-section-title">Visionaries</h3>
            <CollectionEditor items={draft.leaders} token={token} fields={['name', 'biography', 'image']} onChange={(leaders) => update('leaders', leaders)} addLabel="Add Leader" />
          </>
        )}
        {active === 'Life At Trine' && <CollectionEditor items={draft.lifeEvents} token={token} fields={['title', 'year', 'image']} onChange={(lifeEvents) => update('lifeEvents', lifeEvents)} addLabel="Add Event" />}
        {active === 'Services' && (
          <div className="admin-card admin-form-grid">
            {Object.entries(draft.services).filter(([, value]) => !Array.isArray(value)).map(([key, value]) => (
              key.toLowerCase().includes('image')
                ? <UploadField key={key} label={key} value={value} token={token} onChange={(next) => update('services', { ...draft.services, [key]: next })} />
                : <Field key={key} label={key} value={value} multiline={key.toLowerCase().includes('description')} onChange={(next) => update('services', { ...draft.services, [key]: next })} />
            ))}
            <Field label="Core values (one per line)" value={draft.services.values.join('\n')} multiline onChange={(value) => update('services', { ...draft.services, values: value.split('\n').filter(Boolean) })} />
            <div className="admin-full">
              <h3>Activities</h3>
              <CollectionEditor items={draft.services.activities} token={token} fields={['title', 'image']} onChange={(activities) => update('services', { ...draft.services, activities })} addLabel="Add Activity" />
            </div>
          </div>
        )}

        {active === 'Applications' && (
          <div className="admin-applications-wrap">
            <div className="admin-applications-filter">
              <input
                type="text"
                placeholder="Search candidates by name, email, or message keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>

            {applications.length === 0 ? (
              <div className="admin-empty-state">
                No career applications found.
              </div>
            ) : (
              <div className="admin-applications-list">
                {applications
                  .filter((app) => {
                    const q = searchQuery.toLowerCase()
                    return (
                      app.name?.toLowerCase().includes(q) ||
                      app.email?.toLowerCase().includes(q) ||
                      app.message?.toLowerCase().includes(q) ||
                      app.resumeName?.toLowerCase().includes(q)
                    )
                  })
                  .map((app) => (
                    <article className="admin-card admin-app-card" key={app.id}>
                      <div className="admin-app-header">
                        <div>
                          <h3>{app.name}</h3>
                          <a href={`mailto:${app.email}`} className="admin-app-email">
                            {app.email}
                          </a>
                        </div>
                        <span className="admin-app-date">
                          {new Date(app.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="admin-app-body">
                        {app.message ? (
                          <blockquote className="admin-app-message">
                            {app.message}
                          </blockquote>
                        ) : (
                          <p className="admin-app-message-placeholder">
                            (No message provided)
                          </p>
                        )}
                      </div>

                      <div className="admin-app-footer">
                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-resume-btn"
                          >
                            <span>Download Resume ({app.resumeName || 'file'})</span>
                          </a>
                        )}
                        <button
                          type="button"
                          className="admin-danger"
                          onClick={() => deleteApplication(app.id)}
                        >
                          Delete Application
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            )}
          </div>
        )}
      </section>
      {dirty && (
        <div className="admin-save-bar" role="status">
          <div>
            <strong>Unsaved draft</strong>
            <span>Uploads and text changes appear in admin previews first. Save to update the public website.</span>
          </div>
          <button type="button" className="admin-primary" onClick={save}>Save Changes</button>
        </div>
      )}
    </main>
  )
}

function CollectionEditor({ items, fields, token, onChange, addLabel }) {
  const edit = (index, patch) => {
    const next = [...items]
    next[index] = { ...next[index], ...patch }
    onChange(next)
  }
  return (
    <div className="admin-list">
      {items.map((item, index) => (
        <article className="admin-card admin-form-grid" key={item.id}>
          {fields.map((field) => field === 'image'
            ? <UploadField key={field} label={field} value={item[field]} token={token} onChange={(value) => edit(index, { [field]: value })} />
            : <Field key={field} label={field} value={item[field]} multiline={field === 'biography'} onChange={(value) => edit(index, { [field]: value })} />
          )}
          <ItemActions onRemove={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} />
        </article>
      ))}
      <button className="admin-add" onClick={() => onChange([...items, { id: crypto.randomUUID(), ...Object.fromEntries(fields.map((field) => [field, ''])) }])}>{addLabel}</button>
    </div>
  )
}
