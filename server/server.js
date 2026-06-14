import http from 'node:http'
import { createReadStream } from 'node:fs'
import { mkdir, readFile, stat, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
import { DEFAULT_CONTENT } from '../src/data/defaultContent.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = path.join(root, 'server', 'data')
const contentFile = path.join(dataDir, 'content.json')
const applicationsFile = path.join(dataDir, 'applications.json')
const uploadsDir = path.join(root, 'public', 'uploads')
const distDir = path.join(root, 'dist')
const port = Number(process.env.PORT || 8787)
const adminPassword = process.env.ADMIN_PASSWORD || 'change-me'
const maxBody = 35 * 1024 * 1024

await mkdir(dataDir, { recursive: true })
await mkdir(uploadsDir, { recursive: true })

async function ensureApplications() {
  try {
    await stat(applicationsFile)
  } catch {
    await writeFile(applicationsFile, JSON.stringify([], null, 2))
  }
}

await ensureApplications()

async function ensureContent() {

  try {
    await stat(contentFile)
  } catch {
    await writeFile(contentFile, JSON.stringify(DEFAULT_CONTENT, null, 2))
  }
}

await ensureContent()

function json(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(payload))
}

async function body(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > maxBody) throw new Error('Request is too large')
    chunks.push(chunk)
  }
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function authorized(request) {
  return request.headers.authorization === `Bearer ${adminPassword}`
}

function safeName(name) {
  return path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '-')
}

function contentType(file) {
  const ext = path.extname(file).toLowerCase()
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
  }[ext] || 'application/octet-stream'
}

function resolveDistPath(urlPathname) {
  const requested = urlPathname === '/' ? 'index.html' : decodeURIComponent(urlPathname.slice(1))
  const candidate = path.resolve(distDir, requested)
  return candidate.startsWith(distDir) ? candidate : path.join(distDir, 'index.html')
}

async function sendFile(response, file) {
  try {
    const details = await stat(file)
    if (!details.isFile()) throw new Error('Not a file')
    response.writeHead(200, { 'Content-Type': contentType(file) })
    createReadStream(file).pipe(response)
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`)

    if (request.method === 'GET' && url.pathname === '/api/content') {
      return json(response, 200, JSON.parse(await readFile(contentFile, 'utf8')))
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/login') {
      const payload = await body(request)
      return json(response, payload.password === adminPassword ? 200 : 401, {
        ok: payload.password === adminPassword,
      })
    }

    if (request.method === 'PUT' && url.pathname === '/api/admin/content') {
      if (!authorized(request)) return json(response, 401, { error: 'Unauthorized' })
      const payload = await body(request)
      await writeFile(contentFile, JSON.stringify(payload, null, 2))
      return json(response, 200, { ok: true })
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/upload') {
      if (!authorized(request)) return json(response, 401, { error: 'Unauthorized' })
      const payload = await body(request)
      const match = String(payload.dataUrl || '').match(/^data:([^;]+);base64,(.+)$/)
      if (!match) return json(response, 400, { error: 'Invalid upload data' })
      const filename = `${Date.now()}-${safeName(payload.name || 'upload')}`
      await writeFile(path.join(uploadsDir, filename), Buffer.from(match[2], 'base64'))
      return json(response, 200, { url: `/uploads/${filename}` })
    }

    if (request.method === 'POST' && url.pathname === '/api/careers/apply') {
      const payload = await body(request)
      const match = String(payload.resumeData || '').match(/^data:([^;]+);base64,(.+)$/)
      if (!match) return json(response, 400, { error: 'Invalid resume data' })
      
      const filename = `resume-${Date.now()}-${safeName(payload.resumeName || 'resume')}`
      await writeFile(path.join(uploadsDir, filename), Buffer.from(match[2], 'base64'))
      
      const applications = JSON.parse(await readFile(applicationsFile, 'utf8'))
      const newApp = {
        id: crypto.randomUUID(),
        name: payload.name,
        email: payload.email,
        message: payload.message,
        resumeUrl: `/uploads/${filename}`,
        resumeName: payload.resumeName,
        date: new Date().toISOString()
      }
      applications.unshift(newApp)
      await writeFile(applicationsFile, JSON.stringify(applications, null, 2))
      
      return json(response, 200, { ok: true, resumeUrl: newApp.resumeUrl })
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/applications') {
      if (!authorized(request)) return json(response, 401, { error: 'Unauthorized' })
      const applications = JSON.parse(await readFile(applicationsFile, 'utf8'))
      return json(response, 200, applications)
    }

    if (request.method === 'DELETE' && url.pathname.startsWith('/api/admin/applications/')) {
      if (!authorized(request)) return json(response, 401, { error: 'Unauthorized' })
      const id = url.pathname.slice(24) // Length of "/api/admin/applications/" is 24
      if (!id) return json(response, 400, { error: 'Missing application ID' })
      
      const applications = JSON.parse(await readFile(applicationsFile, 'utf8'))
      const index = applications.findIndex(app => app.id === id)
      if (index === -1) return json(response, 404, { error: 'Application not found' })
      
      const app = applications[index]
      if (app.resumeUrl) {
        const filepath = path.join(uploadsDir, safeName(path.basename(app.resumeUrl)))
        await unlink(filepath).catch(() => {})
      }
      
      applications.splice(index, 1)
      await writeFile(applicationsFile, JSON.stringify(applications, null, 2))
      
      return json(response, 200, { ok: true })
    }

    if (url.pathname.startsWith('/uploads/')) {
      return sendFile(response, path.join(uploadsDir, safeName(url.pathname.slice(9))))
    }

    if (request.method === 'GET') {
      const candidate = resolveDistPath(url.pathname)
      const details = await stat(candidate).catch(() => null)
      if (details?.isFile()) return sendFile(response, candidate)
      return sendFile(response, path.join(distDir, 'index.html'))
    }

    json(response, 404, { error: 'Not found' })
  } catch (error) {
    json(response, 500, { error: error.message || 'Server error' })
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Trine API running at http://127.0.0.1:${port}`)
})
