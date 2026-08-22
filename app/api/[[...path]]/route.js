import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { sendEmails } from '@/lib/email'
import { verifyCredentials, issueSessionCookie, clearSessionCookie, getSession } from '@/lib/admin-auth'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'asanyx'

let cached = global._mongo
if (!cached) cached = global._mongo = { client: null, promise: null }

async function getDb() {
  if (cached.client) return cached.client.db(dbName)
  if (!cached.promise) {
    cached.promise = new MongoClient(uri).connect().then((c) => { cached.client = c; return c })
  }
  const c = await cached.promise
  return c.db(dbName)
}

function ok(data = {}) { return NextResponse.json({ ok: true, ...data }) }
function fail(error, status = 400) { return NextResponse.json({ ok: false, error }, { status }) }

export async function GET(request, { params }) {
  const resolved = await params
  const p = (resolved?.path || []).join('/')
  try {
    if (!p || p === '') return ok({ message: 'ASANYX Analytics API', version: '1.1.0' })
    if (p === 'health') return ok({ status: 'healthy' })
    if (p === 'blog') {
      const db = await getDb()
      const posts = await db.collection('blog_posts').find({}).sort({ createdAt: -1 }).limit(50).toArray()
      return ok({ posts: posts.map(({ _id, ...r }) => r) })
    }
    if (p === 'contacts') {
      const db = await getDb()
      const rows = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(100).toArray()
      return ok({ items: rows.map(({ _id, ...r }) => r) })
    }

    // ---------- Admin ----------
    if (p === 'admin/me') {
      const s = await getSession()
      if (!s) return fail('Unauthorized', 401)
      return ok({ email: s.email })
    }
    if (p === 'admin/data') {
      const s = await getSession()
      if (!s) return fail('Unauthorized', 401)
      const db = await getDb()
      const [contacts, applications, newsletter, downloads] = await Promise.all([
        db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
        db.collection('applications').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
        db.collection('newsletter').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
        db.collection('downloads').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
      ])
      const strip = (arr) => arr.map(({ _id, ...r }) => r)
      return ok({
        contacts: strip(contacts),
        applications: strip(applications),
        newsletter: strip(newsletter),
        downloads: strip(downloads),
        stats: {
          contacts: contacts.length,
          applications: applications.length,
          newsletter: newsletter.length,
          downloads: downloads.length,
        }
      })
    }

    return fail('Not found', 404)
  } catch (e) {
    return fail(e.message || 'Server error', 500)
  }
}

export async function POST(request, { params }) {
  const resolved = await params
  const p = (resolved?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))
    const db = await getDb()

    if (p === 'contact') {
      const { name, email, company, phone, service, message } = body
      if (!name || !email || !message) return fail('Name, email and message are required')
      const doc = { id: uuidv4(), name, email, company: company || '', phone: phone || '', service: service || '', message, source: 'contact_form', createdAt: new Date().toISOString() }
      await db.collection('contacts').insertOne(doc)
      sendEmails({ type: 'contact', submissionId: doc.id, data: { name, email, company, phone, service, message } }).catch(e => console.error(e))
      return ok({ id: doc.id })
    }

    if (p === 'consultation') {
      const { name, email, company, phone, preferredTime, topic } = body
      if (!name || !email) return fail('Name and email are required')
      const doc = { id: uuidv4(), name, email, company: company || '', phone: phone || '', preferredTime: preferredTime || '', topic: topic || '', source: 'consultation', createdAt: new Date().toISOString() }
      await db.collection('contacts').insertOne(doc)
      sendEmails({ type: 'consultation', submissionId: doc.id, data: { name, email, company, phone, preferredTime, topic } }).catch(e => console.error(e))
      return ok({ id: doc.id })
    }

    if (p === 'newsletter') {
      const { email } = body
      if (!email) return fail('Email is required')
      const id = uuidv4()
      await db.collection('newsletter').updateOne({ email }, { $set: { email, updatedAt: new Date().toISOString() }, $setOnInsert: { id, createdAt: new Date().toISOString() } }, { upsert: true })
      sendEmails({ type: 'newsletter', submissionId: id, data: { email } }).catch(e => console.error(e))
      return ok()
    }

    if (p === 'careers/apply') {
      const { name, email, phone, role, message, resumeUrl } = body
      if (!name || !email) return fail('Name and email are required')
      const doc = { id: uuidv4(), name, email, phone: phone || '', role: role || 'General', message: message || '', resumeUrl: resumeUrl || '', createdAt: new Date().toISOString() }
      await db.collection('applications').insertOne(doc)
      sendEmails({ type: 'careers/apply', submissionId: doc.id, data: { name, email, phone, role, message, resumeUrl } }).catch(e => console.error(e))
      return ok({ id: doc.id })
    }

    if (p === 'resources/download') {
      const { title, email } = body
      if (!title) return fail('Title is required')
      const id = uuidv4()
      await db.collection('downloads').insertOne({ id, title, email: email || '', createdAt: new Date().toISOString() })
      sendEmails({ type: 'resources/download', submissionId: id, data: { title, email } }).catch(e => console.error(e))
      return ok()
    }

    // ---------- Admin auth ----------
    if (p === 'admin/login') {
      const { email, password } = body
      const valid = await verifyCredentials(email, password)
      if (!valid) return fail('Invalid credentials', 401)
      await issueSessionCookie(email)
      return ok({ email })
    }
    if (p === 'admin/logout') {
      await clearSessionCookie()
      return ok()
    }

    return fail('Not found', 404)
  } catch (e) {
    return fail(e.message || 'Server error', 500)
  }
}
